function toggleEstado(el) {
  const estados = ['aprobada', 'cursando', 'pendiente'];
  let actual = estados.find(e => el.classList.contains(e));

  // Remover clases anteriores
  el.classList.remove('aprobada', 'cursando', 'pendiente');

  // Determinar el siguiente estado
  let siguiente = 'aprobada'; // default
  if (actual === 'aprobada') siguiente = 'cursando';
  else if (actual === 'cursando') siguiente = 'pendiente';

  // Asignar nuevo estado
  el.classList.add(siguiente);
}
