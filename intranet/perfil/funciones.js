
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
    import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
    import { getFirestore, doc, setDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

    const firebaseConfig = {
      apiKey: "AIzaSyBeuFR_MvuAWKan95TEhKvyap51n189tcM",
      authDomain: "intranet-movilizacion-turquia.firebaseapp.com",
      projectId: "intranet-movilizacion-turquia",
      storageBucket: "intranet-movilizacion-turquia.firebasestorage.app",
      messagingSenderId: "633633525264",
      appId: "1:633633525264:web:93010e98058338f3580495"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    let uidActual = null;

    window.mostrarFormularioPerfil = (mostrar) => {
      document.getElementById('formPerfil').style.display = mostrar ? 'flex' : 'none';
      document.getElementById('vistaResumenDatos').style.display = mostrar ? 'none' : 'flex';
    };

    onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.replace("/intranet/");
        return;
      }
      uidActual = user.uid;

      // Escuchar en tiempo real el perfil y los motivos guardados del usuario
      onSnapshot(doc(db, "usuarios", user.uid), (snap) => {
        if (!snap.exists() || snap.data().aprobado !== true) {
          window.location.replace("/intranet/");
          return;
        }

        const d = snap.data();
        if (user.photoURL || d.foto) {
          document.getElementById('userFoto').src = user.photoURL || d.foto;
        }
        document.getElementById('userSaludo').textContent = `${d.nombre || ''} ${d.apellido || ''}`.trim() || user.email;
        document.getElementById('userRol').textContent = d.rol || "Intercesor Aprobado";

        // Actualizar vista resumen
        document.getElementById('txtTelefono').textContent = d.telefono || "Sin teléfono registrado";
        document.getElementById('txtPais').textContent = d.pais || "Sin país registrado";
        document.getElementById('txtIglesia').textContent = d.iglesia || "Sin iglesia registrada";

        // Rellenar inputs del formulario oculto
        document.getElementById('inpNombre').value = d.nombre || "";
        document.getElementById('inpApellido').value = d.apellido || "";
        document.getElementById('inpTelefono').value = d.telefono || "";
        document.getElementById('inpPais').value = d.pais || "";
        document.getElementById('inpIglesia').value = d.iglesia || "";

        // Contadores
        const orados = d.bloquesOrados || [];
        const guardados = d.motivosFavoritos || [];
        document.getElementById('numOraciones').textContent = orados.length;
        document.getElementById('numFavoritos').textContent = guardados.length;

        // Mostrar los Motivos de Oración de cada bloque guardado
        const contenedorMotivos = document.getElementById('listaMotivosGuardados');
        if (guardados.length > 0) {
          let html = '<div style="display:flex; flex-direction:column; gap:14px; text-align:left; margin-top:12px;">';

          guardados.forEach((m) => {
            const itemsHtml = (m.motivos && m.motivos.length > 0)
              ? m.motivos.map(texto => `
                  <li style="background:#f8fafc; border-left:4px solid #0e9594; padding:10px 12px; margin-bottom:8px; border-radius:0 6px 6px 0; font-size:0.88rem; color:#334155; list-style:none;">
                    ${texto}
                  </li>
                `).join('')
              : `<li style="font-size:0.85rem; color:#64748b; list-style:none;">${m.titulo}</li>`;

            html += `
              <div style="border:1px solid #e2e8f0; border-radius:12px; padding:14px; background:#ffffff; box-shadow:0 2px 6px rgba(0,0,0,0.03);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; border-bottom:1px solid #f1f5f9; padding-bottom:6px;">
                  <strong style="color:#1a365d; font-size:0.92rem;">🔖 ${m.titulo}</strong>
                  <span style="font-size:0.72rem; color:#94a3b8;">${m.fechaGuardado || ''}</span>
                </div>
                <ul style="padding:0; margin:0;">
                  ${itemsHtml}
                </ul>
              </div>
            `;
          });

          html += '</div>';
          contenedorMotivos.innerHTML = html;
          contenedorMotivos.style.background = 'transparent';
          contenedorMotivos.style.border = 'none';
          contenedorMotivos.style.padding = '0';
        } else {
          contenedorMotivos.innerHTML = 'Aún no has guardado motivos de oración desde el boletín. Toca el icono de marcador (🔖) en cualquier bloque del boletín para guardarlo aquí.';
          contenedorMotivos.style.background = '#f8fafc';
          contenedorMotivos.style.border = '1px dashed #cbd5e1';
          contenedorMotivos.style.padding = '20px';
        }
      });
    });

    // Guardar cambios del perfil usando setDoc con merge: true (nunca falla)
    document.getElementById('formPerfil').addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!uidActual) return;

      const btn = document.getElementById('btnGuardar');
      const msg = document.getElementById('msgExito');
      btn.textContent = "Guardando...";

      try {
        await setDoc(doc(db, "usuarios", uidActual), {
          nombre: document.getElementById('inpNombre').value.trim(),
          apellido: document.getElementById('inpApellido').value.trim(),
          telefono: document.getElementById('inpTelefono').value.trim(),
          pais: document.getElementById('inpPais').value.trim(),
          iglesia: document.getElementById('inpIglesia').value.trim()
        }, { merge: true });

        btn.textContent = "Guardar Cambios";
        mostrarFormularioPerfil(false);
        msg.style.display = "block";
        setTimeout(() => msg.style.display = "none", 3000);
      } catch (err) {
        btn.textContent = "Guardar Cambios";
        alert("Error al guardar: " + err.message);
      }
    });

    window.cerrarSesion = () => {
      signOut(auth).then(() => window.location.replace("/intranet/"));
    };
 