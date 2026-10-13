import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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
let userData = {};
let pestanaActiva = 'orados';

document.getElementById('btnCerrarSesion')?.addEventListener('click', () => {
  signOut(auth).then(() => window.location.replace("/intranet/"));
});

// 1. Escuchar la sesión y cargar datos en tiempo real
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.replace("/intranet/");
    return;
  }
  currentUser = user;

  onSnapshot(doc(db, "usuarios", user.uid), (snap) => {
    if (!snap.exists()) return;
    userData = snap.data();

    actualizarContadores();
    renderizarLista();
  });
});

// 2. Actualizar las 4 cifras numéricas de las tarjetas
function actualizarContadores() {
  const orados = userData.bloquesOrados || [];
  const guardados = userData.motivosFavoritos || [];
  const contestados = userData.motivosContestados || [];
  const propios = userData.motivosPropios || [];

  document.getElementById('numOrados').textContent = orados.length;
  document.getElementById('numGuardados').textContent = guardados.length;
  document.getElementById('numContestados').textContent = contestados.length;
  document.getElementById('numPropios').textContent = propios.length;
}

// 3. Cambiar de pestaña al hacer clic en cualquiera de las 4 tarjetas
window.cambiarPestana = (pestaña) => {
  pestanaActiva = pestaña;

  // Actualizar tarjeta activa visual
  document.querySelectorAll('.stat-card').forEach((card) => {
    card.classList.toggle('active', card.dataset.tab === pestaña);
  });

  // Título dinámico y botón de nuevo motivo
  const titulos = {
    orados: 'Motivos Orados en el Boletín',
    guardados: 'Motivos Guardados para Intercesión Constante',
    contestados: '✨ Motivos Contestados y Testimonios',
    propios: 'Mis Motivos Personales de Oración'
  };
  document.getElementById('tituloSeccionActiva').textContent = titulos[pestaña] || 'Diario';
  document.getElementById('btnNuevoMotivoPropio').style.display = pestaña === 'propios' ? 'inline-flex' : 'none';

  renderizarLista();
};

// 4. Dibujar la lista correspondiente según la pestaña seleccionada
function renderizarLista() {
  const contenedor = document.getElementById('contenedorLista');
  if (!contenedor) return;

  if (pestanaActiva === 'orados') {
    const lista = userData.bloquesOrados || [];
    if (lista.length === 0) {
      contenedor.innerHTML = `<div class="empty-state">Aún no has marcado oraciones en el boletín. Entra al boletín y presiona "Orar por este motivo".</div>`;
      return;
    }
    contenedor.innerHTML = lista.map(item => `
      <div class="item-card">
        <div class="item-card-header">
          <span class="item-title">🙏 ${item.titulo}</span>
          <span class="item-date">Oración registrada</span>
        </div>
        <div class="item-actions">
          <a href="/intranet/boletin-de-oracion/#${item.id}" class="btn-sub-action">
            <span class="material-symbols-outlined" style="font-size:16px;">open_in_new</span>
            <span>Ver en Boletín</span>
          </a>
        </div>
      </div>
    `).join('');
  }

  else if (pestanaActiva === 'guardados') {
    const lista = userData.motivosFavoritos || [];
    if (lista.length === 0) {
      contenedor.innerHTML = `<div class="empty-state">No tienes motivos guardados. Puedes tocar el icono de marcador (🔖) en cualquier bloque del boletín para tenerlo siempre a mano aquí.</div>`;
      return;
    }
    contenedor.innerHTML = lista.map(item => `
      <div class="item-card">
        <div class="item-card-header">
          <span class="item-title">🔖 ${item.titulo}</span>
          <span class="item-date">${item.fechaGuardado || ''}</span>
        </div>
        <div class="item-body">
          ${item.motivos && item.motivos.length > 0 
            ? `<ul>${item.motivos.map(m => `<li>${m}</li>`).join('')}</ul>` 
            : `<p>Motivo guardado del boletín</p>`}
        </div>
        <div class="item-actions">
          <button type="button" class="btn-sub-action btn-answer" onclick="iniciarContestar('${item.id}', '${item.titulo}')">
            <span class="material-symbols-outlined" style="font-size:16px;">verified</span>
            <span>¡Dios lo respondió!</span>
          </button>
          <button type="button" class="btn-sub-action btn-delete" onclick="eliminarGuardado('${item.id}')">
            <span class="material-symbols-outlined" style="font-size:16px;">delete</span>
            <span>Quitar</span>
          </button>
        </div>
      </div>
    `).join('');
  }

  else if (pestanaActiva === 'contestados') {
    const lista = userData.motivosContestados || [];
    if (lista.length === 0) {
      contenedor.innerHTML = `<div class="empty-state">Aquí se guardarán las victorias y testimonios cuando Dios responda tus oraciones.</div>`;
      return;
    }
    contenedor.innerHTML = lista.map(item => `
      <div class="item-card" style="border-left: 4px solid #eab308; background:#fffbeb;">
        <div class="item-card-header">
          <span class="item-title">✨ ${item.peticion}</span>
          <span class="item-date">${item.fecha || ''}</span>
        </div>
        <div class="item-body" style="font-style: italic; color:#78350f;">
          "${item.testimonio}"
        </div>
      </div>
    `).join('');
  }

  else if (pestanaActiva === 'propios') {
    const lista = userData.motivosPropios || [];
    if (lista.length === 0) {
      contenedor.innerHTML = `<div class="empty-state">No tienes peticiones personales guardadas. Presiona el botón verde de arriba "+ Nueva Petición Personal" para registrar tus causas íntimas.</div>`;
      return;
    }
    contenedor.innerHTML = lista.map(item => `
      <div class="item-card">
        <div class="item-card-header">
          <span class="item-title">✍️ ${item.titulo}</span>
          <span class="item-date">${item.fecha || ''}</span>
        </div>
        <div class="item-body">
          <p style="margin:0;">${item.detalle}</p>
        </div>
        <div class="item-actions">
          <button type="button" class="btn-sub-action btn-answer" onclick="iniciarContestar('${item.id}', '${item.titulo}')">
            <span class="material-symbols-outlined" style="font-size:16px;">verified</span>
            <span>¡Dios respondió!</span>
          </button>
          <button type="button" class="btn-sub-action btn-delete" onclick="eliminarPropio('${item.id}')">
            <span class="material-symbols-outlined" style="font-size:16px;">delete</span>
            <span>Eliminar</span>
          </button>
        </div>
      </div>
    `).join('');
  }
}

// 5. ACCIONES: Agregar Motivo Propio
window.abrirModalPropio = (abrir) => {
  document.getElementById('modalMotivoPropio').style.display = abrir ? 'flex' : 'none';
  if (abrir) document.getElementById('formMotivoPropio').reset();
};

document.getElementById('formMotivoPropio')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!currentUser) return;

  const btn = document.getElementById('btnGuardarPropio');
  btn.textContent = "Guardando...";

  const nuevoPropio = {
    id: "propio-" + Date.now(),
    titulo: document.getElementById('inpPropioTitulo').value.trim(),
    detalle: document.getElementById('inpPropioDetalle').value.trim(),
    fecha: new Date().toLocaleDateString('es-ES')
  };

  await updateDoc(doc(db, "usuarios", currentUser.uid), {
    motivosPropios: arrayUnion(nuevoPropio)
  });

  btn.textContent = "Guardar en mi Diario";
  abrirModalPropio(false);
});

// 6. ACCIONES: Mover a Contestados (Testimonio)
window.iniciarContestar = (id, titulo) => {
  document.getElementById('contestarId').value = id;
  document.getElementById('contestarTitulo').value = titulo;
  document.getElementById('contestarPeticionTexto').textContent = titulo;
  document.getElementById('modalContestar').style.display = 'flex';
};

window.abrirModalContestar = (abrir) => {
  document.getElementById('modalContestar').style.display = abrir ? 'flex' : 'none';
};

document.getElementById('formContestar')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!currentUser) return;

  const id = document.getElementById('contestarId').value;
  const titulo = document.getElementById('contestarTitulo').value;
  const testimonio = document.getElementById('inpTestimonio').value.trim();

  const contestadoItem = {
    id: "contestado-" + Date.now(),
    peticion: titulo,
    testimonio: testimonio,
    fecha: new Date().toLocaleDateString('es-ES')
  };

  // Quitar de guardados o propios
  const itemGuardado = (userData.motivosFavoritos || []).find(m => m.id === id);
  const itemPropio = (userData.motivosPropios || []).find(m => m.id === id);

  const updates = {
    motivosContestados: arrayUnion(contestadoItem)
  };
  if (itemGuardado) updates.motivosFavoritos = arrayRemove(itemGuardado);
  if (itemPropio) updates.motivosPropios = arrayRemove(itemPropio);

  await updateDoc(doc(db, "usuarios", currentUser.uid), updates);

  abrirModalContestar(false);
  cambiarPestana('contestados');
});

// 7. Eliminar elementos individuales
window.eliminarGuardado = async (id) => {
  if (!confirm("¿Deseas quitar este motivo de tus guardados?")) return;
  const item = (userData.motivosFavoritos || []).find(m => m.id === id);
  if (item) {
    await updateDoc(doc(db, "usuarios", currentUser.uid), {
      motivosFavoritos: arrayRemove(item)
    });
  }
};

window.eliminarPropio = async (id) => {
  if (!confirm("¿Deseas eliminar esta petición personal?")) return;
  const item = (userData.motivosPropios || []).find(m => m.id === id);
  if (item) {
    await updateDoc(doc(db, "usuarios", currentUser.uid), {
      motivosPropios: arrayRemove(item)
    });
  }
};