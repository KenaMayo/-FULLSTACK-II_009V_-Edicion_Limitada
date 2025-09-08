// Administración de diseñadores
document.addEventListener('DOMContentLoaded', function () {
  // Lista de diseñadores en orden específico
  const designers = [
    'Alter', 'Amanda', 'Caro Piña', 'Coca Moya', 'Cog by Cal',
    'Dreamworld', 'Fancy', 'Fran Garcia', 'Game Over', 'GOIS',
    'Happy Berry', 'Hurga', 'Incorrecta', 'Irreversible',
    'Josefina Collection', 'Kaosfera', 'Kazú', 'KELIO',
    'Kuro Archives', 'Lena Freestyle', 'Lisauskas', 'Mal Vidal',
    'Marta by Tamar', 'Mitsuki Studio', 'Sin Etiquetas',
    'Valentina Gaymer', 'Virtual Genesis', 'Vnneno'
  ];

  // Elementos del DOM
  const grid = document.getElementById('designersGrid');
  const btnEdit = document.getElementById('btnEdit');
  const btnDelete = document.getElementById('btnDelete');

  // Verificar si existe el grid (solo en la página de diseñadores)
  if (!grid) return;

  // Configuración
  const perRow = 4;

  // Construir la grilla de diseñadores
  function buildDesignersGrid() {
    for (let i = 0; i < designers.length; i += perRow) {
      const row = document.createElement('div');
      row.className = 'row g-3';

      for (let j = 0; j < perRow; j++) {
        const designerName = designers[i + j];
        const col = document.createElement('div');
        col.className = 'col-sm';

        const designerBox = document.createElement('div');
        designerBox.className = 'designer-box text-center';
        designerBox.style.minHeight = '110px';
        designerBox.innerHTML = designerName ? `<div class="h5 m-0">${designerName}</div>` : '&nbsp;';

        col.appendChild(designerBox);
        row.appendChild(col);
      }
      grid.appendChild(row);
    }
  }

  // Limpiar selección
  function clearSelection() {
    document.querySelectorAll('.designer-box.selected').forEach(el => el.classList.remove('selected'));
    updateButtons(false);
  }

  // Seleccionar diseñador
  function selectDesigner(box) {
    clearSelection();
    box.classList.add('selected');
    updateButtons(true);
  }

  // Actualizar estado de botones
  function updateButtons(enabled) {
    if (btnEdit) btnEdit.disabled = !enabled;
    if (btnDelete) btnDelete.disabled = !enabled;
  }

  // Manejar clicks en la grilla
  function handleGridClick(event) {
    const designerBox = event.target.closest('.designer-box');
    
    if (!designerBox) {
      clearSelection();
      return;
    }

    // Toggle selección
    if (designerBox.classList.contains('selected')) {
      clearSelection();
    } else {
      selectDesigner(designerBox);
    }
  }

  // Inicializar
  buildDesignersGrid();
  grid.addEventListener('click', handleGridClick);
});
