 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
  import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
  import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc, 
    updateDoc, 
    arrayUnion, 
    arrayRemove, 
    increment, 
    onSnapshot 
  } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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

  let currentUser = null;
  let misOrados = [];
  let misGuardados = [];

  // 1. LEER LOS BLOQUES DESDE FIREBASE Y OCULTAR LOS DESMARCADOS
  async function cargarBloquesDesdeBoveda() {
    for (let i = 1; i <= 9; i++) {
      const bloqueId = `seccion-${i}`;
      const card = document.getElementById(bloqueId);
      const linkMenu = document.querySelector(`.dropdown-menu a[href="#${bloqueId}"]`);
      if (!card) continue;

      try {
        const snap = await getDoc(doc(db, "boletin_bloques", bloqueId));
        if (snap.exists()) {
          const d = snap.data();

          // SI EN EL ADMIN DESMARCASTE "MOSTRAR ESTE BLOQUE": Se elimina del Boletín y del Menú
          if (d.activo === false) {
            card.style.display = 'none';
            card.classList.remove('motivo-extra', 'visible');
            card.remove();
            if (linkMenu) linkMenu.style.display = 'none';
            continue;
          }

          const titleEl = card.querySelector('.day-title');
          const imgEl = card.querySelector('.photo-container img');
          const verseEl = card.querySelector('.verse-box');
          const parrafos = card.querySelectorAll('.day-content > p');
          const listaEl = card.querySelector('.prayer-list');

          if (titleEl && d.titulo) titleEl.textContent = d.titulo;
          if (imgEl && d.imagen) imgEl.src = d.imagen;
          if (verseEl && d.versiculo) {
            verseEl.innerHTML = `«${d.versiculo}»<br><strong>${d.cita || ''}</strong>`;
          }
          if (parrafos[0] && d.contexto) parrafos[0].textContent = d.contexto;
          if (parrafos[1] && d.desafio) parrafos[1].textContent = d.desafio;

          if (listaEl && d.motivos && d.motivos.length > 0) {
            listaEl.innerHTML = d.motivos.map(linea => {
              const partes = linea.split(':');
              if (partes.length > 1) {
                return `<li class="prayer-item"><strong>${partes[0]}:</strong> ${partes.slice(1).join(':')}</li>`;
              }
              return `<li class="prayer-item">${linea}</li>`;
            }).join('');
          }
        }
      } catch (e) {
        console.warn("Error leyendo bloque:", bloqueId, e);
      }
    }
  }

function inyectarBotonesEnBloques() {
    document.querySelectorAll('.day-card').forEach((card, index) => {
      const bloqueId = card.id || `seccion-${index + 1}`;
      const bar = card.querySelector('.social-prayer-bar');
      if (!bar) return;

      const btnPray = bar.querySelector('.btn-social-pray');
      const btnSave = bar.querySelector('.btn-social-save');
      const pillCount = bar.querySelector('.social-count-pill');

      if (!btnPray || btnPray.dataset.listenerAdded) return;

      btnPray.dataset.id = bloqueId;
      if (btnSave) btnSave.dataset.id = bloqueId;
      if (pillCount) pillCount.id = `count-pray-${bloqueId}`;

      const numSpan = card.querySelector('.day-header span:first-child');
      const titleSpan = card.querySelector('.day-title');
      const tituloCompleto = `${numSpan ? numSpan.textContent.trim() : 'Bloque'} - ${titleSpan ? titleSpan.textContent.trim() : ''}`;

      btnPray.dataset.titulo = tituloCompleto;
      if (btnSave) btnSave.dataset.titulo = tituloCompleto;
      btnPray.dataset.listenerAdded = "true";

      // 1. Agregar el botón de comentario a la barra si no existe
      if (!bar.querySelector('.btn-social-comment')) {
        const btnComment = document.createElement('button');
        btnComment.type = "button";
        btnComment.className = "btn-social-comment";
        btnComment.innerHTML = `
          <span class="material-symbols-outlined" style="font-size:18px;">chat_bubble</span>
          <span class="txt-comment-count" id="count-comm-${bloqueId}">0</span>
        `;
        bar.appendChild(btnComment);

        // 2. Crear la caja desplegable de comentarios debajo de la barra
        const commentsBox = document.createElement('div');
        commentsBox.className = "comments-container";
        commentsBox.id = `box-comm-${bloqueId}`;
        commentsBox.innerHTML = `
          <form class="comment-form" onsubmit="enviarComentario(event, '${bloqueId}')">
            <input type="text" class="comment-input" placeholder="Escribe un mensaje de aliento o confirmación..." required>
            <button type="submit" class="btn-comment-send">
              <span>Enviar</span>
              <span class="material-symbols-outlined" style="font-size:16px;">send</span>
            </button>
          </form>
          <div class="comments-list" id="list-comm-${bloqueId}">
            <div style="font-size:0.8rem; color:#94a3b8; text-align:center;">Cargando comentarios...</div>
          </div>
        `;
        card.querySelector('.day-content').appendChild(commentsBox);

        // Abrir / Cerrar comentarios al hacer clic
        btnComment.addEventListener('click', () => {
          commentsBox.classList.toggle('open');
        });

        // Escuchar comentarios en tiempo real desde Firebase
        const q = query(
          collection(db, "comentarios_bloques"),
          where("bloqueId", "==", bloqueId),
          orderBy("fecha", "asc")
        );

        onSnapshot(q, (snapshot) => {
          const countEl = document.getElementById(`count-comm-${bloqueId}`);
          if (countEl) countEl.textContent = snapshot.size;

          const listEl = document.getElementById(`list-comm-${bloqueId}`);
          if (!listEl) return;

          if (snapshot.empty) {
            listEl.innerHTML = `<div style="font-size:0.8rem; color:#94a3b8; text-align:center; padding:6px 0;">Sé el primero en dejar un mensaje o motivo de aliento.</div>`;
            return;
          }

          let html = "";
          snapshot.forEach((docSnap) => {
            const c = docSnap.data();
            html += `
              <div class="comment-card">
                <div class="comment-author">
                  <span>${c.autorNombre} ${c.autorIglesia ? `(${c.autorIglesia})` : ''}</span>
                  <span class="comment-date">${c.fechaTexto || ''}</span>
                </div>
                <p class="comment-text">${c.texto}</p>
              </div>
            `;
          });
          listEl.innerHTML = html;
        });
      }

      onSnapshot(doc(db, "contadores_bloques", bloqueId), (snap) => {
        const total = snap.exists() ? (snap.data().total || 0) : 0;
        if (pillCount) pillCount.textContent = total;
      });

      btnPray.addEventListener('click', () => toggleOrarBloque(bloqueId, tituloCompleto));
      if (btnSave) {
        btnSave.addEventListener('click', () => toggleGuardarBloque(bloqueId, tituloCompleto));
      }
    });
  }

  // Función para guardar el comentario en Firebase Firestore
  window.enviarComentario = async (e, bloqueId) => {
    e.preventDefault();
    if (!currentUser) return;

    const form = e.target;
    const input = form.querySelector('.comment-input');
    const texto = input.value.trim();
    if (!texto) return;

    const userSnap = await getDoc(doc(db, "usuarios", currentUser.uid));
    const userData = userSnap.exists() ? userSnap.data() : {};

    const autorNombre = `${userData.nombre || ''} ${userData.apellido || ''}`.trim() || currentUser.displayName || "Intercesor";
    const autorIglesia = userData.iglesia && userData.iglesia !== "Completar en Mi Perfil" ? userData.iglesia : (userData.pais || "");

    input.disabled = true;

    try {
      await addDoc(collection(db, "comentarios_bloques"), {
        bloqueId: bloqueId,
        uid: currentUser.uid,
        autorNombre: autorNombre,
        autorIglesia: autorIglesia,
        texto: texto,
        fecha: new Date(),
        fechaTexto: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
      });
      input.value = "";
    } catch (err) {
      alert("No se pudo publicar el comentario: " + err.message);
    } finally {
      input.disabled = false;
      input.focus();
    }
  };

  // Cambiar de color el botón y su icono cuando está activo
  function actualizarEstadoVisualBotones() {
    document.querySelectorAll('.btn-social-pray').forEach((btn) => {
      const id = btn.dataset.id;
      const yaOro = misOrados.some(item => item.id === id);
      btn.classList.toggle('active', yaOro);
      btn.classList.toggle('prayed', yaOro);

      // Cambiar color directamente para que resalte siempre
      btn.style.backgroundColor = yaOro ? '#10b981' : '';
      btn.style.borderColor = yaOro ? '#059669' : '';
      btn.style.color = yaOro ? '#ffffff' : '';
      const svgIcon = btn.querySelector('.material-icono-svg-ora');
      const countPill = btn.querySelector('.social-count-pill');
      if (svgIcon) svgIcon.style.color = yaOro ? '#ffffff' : '';
      if (countPill) countPill.style.color = yaOro ? '#ffffff' : '';
    });

    document.querySelectorAll('.btn-social-save').forEach((btn) => {
      const id = btn.dataset.id;
      const yaGuardo = misGuardados.some(item => item.id === id);
      btn.classList.toggle('active', yaGuardo);
      btn.classList.toggle('saved', yaGuardo);

      // Cambiar color a azul intenso cuando está guardado
      btn.style.backgroundColor = yaGuardo ? '#2563eb' : '';
      btn.style.borderColor = yaGuardo ? '#1d4ed8' : '';
      const iconSpan = btn.querySelector('.material-symbols-outlined');
      if (iconSpan) iconSpan.style.color = yaGuardo ? '#ffffff' : '';
    });
  }

  async function toggleOrarBloque(bloqueId, titulo) {
    if (!currentUser) return;
    const userRef = doc(db, "usuarios", currentUser.uid);
    const countRef = doc(db, "contadores_bloques", bloqueId);
    const itemExistente = misOrados.find(item => item.id === bloqueId);

    if (itemExistente) {
      await updateDoc(userRef, {
        bloquesOrados: arrayRemove(itemExistente),
        misOracionesCount: increment(-1)
      });
      await setDoc(countRef, { total: increment(-1) }, { merge: true });
    } else {
      const nuevoItem = { id: bloqueId, titulo: titulo };
      await updateDoc(userRef, {
        bloquesOrados: arrayUnion(nuevoItem),
        misOracionesCount: increment(1)
      });
      await setDoc(countRef, { total: increment(1), titulo: titulo }, { merge: true });
    }
  }

// 4. Acción al hacer clic en "🔖 Guardar": Guarda el título + los motivos de oración del bloque
  async function toggleGuardarBloque(bloqueId, titulo) {
    if (!currentUser) return;
    const userRef = doc(db, "usuarios", currentUser.uid);
    const itemExistente = misGuardados.find(item => item.id === bloqueId);

    if (itemExistente) {
      // Si ya estaba guardado y lo vuelve a tocar, lo quita de su perfil
      await updateDoc(userRef, { motivosFavoritos: arrayRemove(itemExistente) });
    } else {
      // Extraer el título real del bloque y únicamente sus motivos de oración (.prayer-item)
      const card = document.getElementById(bloqueId);
      let tituloReal = titulo;
      let listaMotivos = [];

      if (card) {
        const numSpan = card.querySelector('.day-header span:first-child');
        const titleSpan = card.querySelector('.day-title');
        if (titleSpan) {
          tituloReal = `${numSpan ? numSpan.textContent.trim() : ''} - ${titleSpan.textContent.trim()}`;
        }

        card.querySelectorAll('.prayer-item').forEach((li) => {
          listaMotivos.push(li.innerHTML.trim());
        });
      }

      const nuevoItem = {
        id: bloqueId,
        titulo: tituloReal,
        motivos: listaMotivos,
        fechaGuardado: new Date().toLocaleDateString('es-ES')
      };

      await updateDoc(userRef, { motivosFavoritos: arrayUnion(nuevoItem) });
    }
  }
  // 3. VERIFICAR SESIÓN Y EJECUTAR LA CARGA DE BLOQUES
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      window.location.replace("/intranet/");
      return;
    }
    currentUser = user;

    // 👇 AQUÍ SE LLAMA A LA FUNCIÓN QUE OCULTA LOS BLOQUES DESMARCADOS 👇
    await cargarBloquesDesdeBoveda();
    inyectarBotonesEnBloques();

    const userRef = doc(db, "usuarios", user.uid);
    onSnapshot(userRef, (snap) => {
      if (!snap.exists() || snap.data().aprobado !== true) {
        window.location.replace("/intranet/");
        return;
      }
      const data = snap.data();
      misOrados = data.bloquesOrados || [];
      misGuardados = data.motivosFavoritos || [];
      actualizarEstadoVisualBotones();
    });
  });

  window.cerrarSesionIntranet = () => {
    signOut(auth).then(() => window.location.replace("/intranet/"));
  };

  import { 
  getFirestore, doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove, increment, onSnapshot,
  collection, addDoc, query, where, orderBy 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";