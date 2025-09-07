// assets/js/designers_admin.js
document.addEventListener('DOMContentLoaded', function () {
  // Lista en el orden EXACTO que quieres mostrar
  const designers = [
    'Alter','Amanda','Caro Piña','Coca Moya','Cog by Cal',
    'Dreamworld','Fancy','Fran Garcia','Game Over','GOIS',
    'Happy Berry','Hurga','Incorrecta','Irreversible',
    'Josefina Collection','Kaosfera','Kazú','KELIO',
    'Kuro Archives','Lena Freestyle','Lisauskas','Mal Vidal',
    'Marta by Tamar','Mitsuki Studio','Sin Etiquetas',
    'Valentina Gaymer','Virtual Genesis','Vnneno'
  ];

  const perRow = 4; // 4 columnas por fila
  const grid = document.getElementById('designersGrid');
  const btnEdit = document.getElementById('btnEdit');
  const btnDelete = document.getElementById('btnDelete');

  if (!grid) return;

  // Construir la grilla 4×fila
  for (let i = 0; i < designers.length; i += perRow) {
    const row = document.createElement('div');
    row.className = 'row g-3';

    for (let j = 0; j < perRow; j++) {
      const name = designers[i + j];
      const col = document.createElement('div');
      col.className = 'col-sm';

      const box = document.createElement('div');
      box.className = 'designer-box text-center';
      box.style.minHeight = '110px';

      box.innerHTML = name ? `<div class="h5 m-0">${name}</div>` : '&nbsp;';

      col.appendChild(box);
      row.appendChild(col);
    }
    grid.appendChild(row);
  }

  // Utilidades de selección
  function clearSelection() {
    document.querySelectorAll('.designer-box.selected').forEach(el => el.classList.remove('selected'));
    if (btnEdit) btnEdit.disabled = true;
    if (btnDelete) btnDelete.disabled = true;
  }

  function selectBox(box) {
    clearSelection();
    box.classList.add('selected');
    if (btnEdit) btnEdit.disabled = false;
    if (btnDelete) btnDelete.disabled = false;
  }

  // Delegación de eventos para seleccionar/deseleccionar
  grid.addEventListener('click', (e) => {
    const box = e.target.closest('.designer-box');
    if (!box) { // click fuera: limpiar
      clearSelection();
      return;
    }
    // toggle
    if (box.classList.contains('selected')) {
      clearSelection();
    } else {
      selectBox(box);
    }
  });
});
