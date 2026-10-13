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
  onSnapshot,
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy 
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

// 1. CARGAR BLOQUES DESDE FIREBASE Y OCULTAR LOS DESMARCADOS
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

// 2. CONECTAR BOTONES DE ORAR, GUARDAR Y COMENTAR EN CADA BLOQUE
function inyectarBotonesEnBloques() {
  document.querySelectorAll('.day-card').forEach((card, index) => {
    const bloqueId = card.id || `seccion-${index + 1}`;
    const bar = card.querySelector('.social-prayer-bar');
    if (!bar) return;

    const btnPray = bar.querySelector('.btn-social-pray');
    const btnSave = bar.querySelector('.btn-social-save');
    const btnComm = bar.querySelector('.btn-social-comment');
    const pillCount = bar.querySelector('.social-count-pill');
    const boxComm = card.querySelector('.comments-container');

    if (!btnPray || btnPray.dataset.listenerAdded) return;

    btnPray.dataset.id = bloqueId;
    if (btnSave) btnSave.dataset.id = bloqueId;
    if (btnComm) btnComm.dataset.id = bloqueId;
    if (pillCount) pillCount.id = `count-pray-${bloqueId}`;

    const numSpan = card.querySelector('.day-header span:first-child');
    const titleSpan = card.querySelector('.day-title');
    const tituloCompleto = `${numSpan ? numSpan.textContent.trim() : 'Bloque'} - ${titleSpan ? titleSpan.textContent.trim() : ''}`;

    btnPray.dataset.titulo = tituloCompleto;
    if (btnSave) btnSave.dataset.titulo = tituloCompleto;
    btnPray.dataset.listenerAdded = "true";

    // Contador de oraciones en tiempo real
    onSnapshot(doc(db, "contadores_bloques", bloqueId), (snap) => {
      const total = snap.exists() ? (snap.data().total || 0) : 0;
      if (pillCount) pillCount.textContent = total;
    });

    btnPray.addEventListener('click', () => toggleOrarBloque(bloqueId, tituloCompleto));
    if (btnSave) {
      btnSave.addEventListener('click', () => toggleGuardarBloque(bloqueId, tituloCompleto));
    }

    // Desplegar comentarios al tocar el botón de comentario
    if (btnComm && boxComm) {
      btnComm.addEventListener('click', () => {
        boxComm.classList.toggle('open');
      });

      // Escuchar comentarios en tiempo real para este bloque
    try {
      const q = query(
        collection(db, "comentarios_bloques"),
        where("bloqueId", "==", bloqueId)
      );

      onSnapshot(q, (snapshot) => {
        const countCommEl = document.getElementById(`count-comm-${bloqueId}`);
        const listEl = document.getElementById(`list-comm-${bloqueId}`);

        if (countCommEl) countCommEl.textContent = snapshot.size;
        if (!listEl) return;

        if (snapshot.empty) {
          listEl.innerHTML = `<div style="font-size:0.8rem; color:#94a3b8; text-align:center; padding:8px 0;">Sé el primero en dejar un mensaje o confirmación de oración.</div>`;
          return;
        }

        const comentarios = [];
        snapshot.forEach((docSnap) => {
          comentarios.push(docSnap.data());
        });

        // Ordenar de más antiguo a más reciente
        comentarios.sort((a, b) => {
          const tA = a.fecha?.seconds || (new Date(a.fecha || 0).getTime() / 1000);
          const tB = b.fecha?.seconds || (new Date(b.fecha || 0).getTime() / 1000);
          return tA - tB;
        });

        let html = "";
        comentarios.forEach((c) => {
          html += `
            <div class="comment-card" style="background:#ffffff; padding:10px 12px; border-radius:10px; border:1px solid #e2e8f0; margin-bottom:8px;">
              <div class="comment-author" style="font-weight:700; color:#1a365d; font-size:0.82rem; display:flex; justify-content:space-between;">
                <span>${c.autorNombre || 'Intercesor'} ${c.autorIglesia ? `(${c.autorIglesia})` : ''}</span>
                <span class="comment-date" style="font-size:0.72rem; color:#94a3b8; font-weight:normal;">${c.fechaTexto || ''}</span>
              </div>
              <p class="comment-text" style="margin:4px 0 0 0; color:#334155; font-size:0.85rem; line-height:1.4;">${c.texto || ''}</p>
            </div>
          `;
        });
        listEl.innerHTML = html;
      }, (err) => {
        console.error("Error en lectura de comentarios para " + bloqueId + ":", err);
        const listEl = document.getElementById(`list-comm-${bloqueId}`);
        if (listEl) {
          listEl.innerHTML = `<div style="font-size:0.8rem; color:#dc2626; text-align:center;">Aviso de permisos: Revisa Firestore Rules (${err.code})</div>`;
        }
      });
    } catch (e) {
      console.warn("Excepción al configurar comentarios:", e);
    } catch (errQ) {
        console.warn("Aviso comentarios query:", errQ);
      }
    }
  });
}

// 3. ENVIAR COMENTARIO A FIREBASE
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

// 4. CAMBIAR DE COLOR LOS BOTONES CUANDO ESTÁN ACTIVOS
function actualizarEstadoVisualBotones() {
  document.querySelectorAll('.btn-social-pray').forEach((btn) => {
    const id = btn.dataset.id;
    const yaOro = misOrados.some(item => item.id === id);

    btn.classList.toggle('active', yaOro);
    btn.classList.toggle('prayed', yaOro);

    btn.style.setProperty('background-color', yaOro ? '#10b981' : '', 'important');
    btn.style.setProperty('border-color', yaOro ? '#059669' : '', 'important');
    btn.style.setProperty('color', yaOro ? '#ffffff' : '', 'important');

    const svgIcon = btn.querySelector('.material-icono-svg-ora');
    const countPill = btn.querySelector('.social-count-pill');
    if (svgIcon) svgIcon.style.color = yaOro ? '#ffffff' : 'var(--secondary-color)';
    if (countPill) countPill.style.color = yaOro ? '#ffffff' : 'var(--secondary-color)';
  });

  document.querySelectorAll('.btn-social-save').forEach((btn) => {
    const id = btn.dataset.id;
    const yaGuardo = misGuardados.some(item => item.id === id);

    btn.classList.toggle('active', yaGuardo);
    btn.classList.toggle('saved', yaGuardo);

    btn.style.setProperty('background-color', yaGuardo ? '#2563eb' : '', 'important');
    btn.style.setProperty('border-color', yaGuardo ? '#1d4ed8' : '', 'important');
    btn.style.setProperty('color', yaGuardo ? '#ffffff' : '', 'important');

    const iconSpan = btn.querySelector('.material-symbols-outlined');
    if (iconSpan) iconSpan.style.color = yaGuardo ? '#ffffff' : 'var(--secondary-color)';
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

async function toggleGuardarBloque(bloqueId, titulo) {
  if (!currentUser) return;
  const userRef = doc(db, "usuarios", currentUser.uid);
  const itemExistente = misGuardados.find(item => item.id === bloqueId);

  if (itemExistente) {
    await updateDoc(userRef, { motivosFavoritos: arrayRemove(itemExistente) });
  } else {
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

// 5. INICIALIZACIÓN
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.replace("/intranet/");
    return;
  }
  currentUser = user;

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