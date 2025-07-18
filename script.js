const ramos = [
    // 1er semestre
    { id: "biologia-celular", nombre: "Biología Celular", semestre: 1 },
    { id: "biologia-molecular", nombre: "Biología Molecular", semestre: 1 },
    { id: "histologia", nombre: "Histología Funcional", semestre: 1 },
    { id: "embriologia", nombre: "Embriología General y Evolución", semestre: 1 },
    { id: "bioquimica-general", nombre: "Bioquímica General", semestre: 1 },
    { id: "comunicativas", nombre: "Competencias Comunicativas", semestre: 1 },
    { id: "catedra", nombre: "Cátedra", semestre: 1 },

    // 2do semestre
    { id: "neurociencias", nombre: "Neurociencias", semestre: 2, req: ["biologia-celular", "biologia-molecular"]},
    { id: "anat-fisio", nombre: "Anatomía y Fisiología del Movimiento", semestre: 2, req: ["histologia", "embriologia"]},
    { id: "bioquimica-medica", nombre: "Bioquímica Médica", semestre: 2, req: ["bioquimica-general"]},
    { id: "biofisica", nombre: "Biofísica", semestre: 2 },
    { id: "seminario1", nombre: "Seminario de Investigación I", semestre: 2 },
    { id: "etica", nombre: "Ética y Política", semestre: 2 },

    // 3er semestre
    { id: "sis-cardio", nombre: "Sistema Cardiovascular y Respiratorio", semestre: 3, req: ["anat-fisio", "neurociencias"]},
    { id: "sis-genit", nombre: "Sistema Genitourinario y Reproductivo", semestre: 3, req: ["anat-fisio", "neurociencias"]},
    { id: "sis-gastro", nombre: "Sistema Gastrointestinal y Nutrición", semestre: 3, req: ["anat-fisio", "neurociencias"]},
    { id: "seminario2", nombre: "Seminario de Investigación II", semestre: 3, req:["seminario1"]},
    { id: "antropologia", nombre: "Sociohumanidades I (Antropología)", semestre: 3 },

    // 4to semestre
    { id: "inmuno", nombre: "Inmunohematología", semestre: 4, req:["sis-cardio", "sis-genit", "sis-gastro"]},
    { id: "infecciosas1", nombre: "Enfermedades Infecciosas I", semestre: 4, req: ["sis-cardio", "sis-genit", "sis-gastro"]},
    { id: "procedimientos", nombre: "Procedimientos Básicos", semestre: 4 },
    { id: "patologia", nombre: "Patología General", semestre: 4, req: ["sis-cardio", "sis-genit", "sis-gastro"]},
    { id: "seminario3", nombre: "Seminario de Investigación III", semestre: 4, req: ["seminario2"]},
    { id: "sociologia", nombre: "Sociohumanidades II (Sociología)", semestre: 4 },

    // 5to semestre
    { id: "psicologia", nombre: "Psicología por Sistemas", semestre: 5, req: ["neurociencias", "bioquimica-medica"]},
    { id: "infecciosas2", nombre: "Enfermedades Infecciosas II", semestre: 5, req: ["infecciosas1"]},
    { id: "farmacologia", nombre: "Farmacología", semestre: 5, req: ["neurociencias", "bioquimica-medica"]},
    { id: "salud-mental", nombre: "Salud Mental", semestre: 5, req: ["patologia", "infecciosas1"]},
    { id: "historia-med", nombre: "Historia de la Medicina", semestre: 5 },

    // 6to semestre
    { id: "semiologia", nombre: "Semiología", semestre: 6 },
    { id: "psiquiatria", nombre: "Psiquiatría", semestre: 6, req: ["psicologia", "salud-mental"]},

    // 7mo semestre
    { id: "adulto", nombre: "Medicina del Adulto y Vejez", semestre: 7, req: ["semiologia"]},
    { id: "rehab-adulto", nombre: "Rehabilitación del Adulto", semestre: 7},
    { id: "bioetica", nombre: "Bioética", semestre: 7 },

    // 8vo semestre
    { id: "genetica", nombre: "Genética", semestre: 8 },
    { id: "nino", nombre: "Medicina del Niño y Adolescente", semestre: 8, req: ["adulto"]},
    { id: "rehab-nino", nombre: "Rehabilitación del Niño", semestre: 8 },

    // 9no semestre
    { id: "mujer", nombre: "Medicina de la Mujer y Perinatología", semestre: 9, req: ["genetica", "nino", "adulto"]},
    { id: "salud-ocupacional", nombre: "Salud Ocupacional", semestre: 9 },
    { id: "gestion1", nombre: "Gestión I", semestre: 9 },

    // 10mo semestre
    { id: "anestesia", nombre: "Anestesiología y Reanimación", semestre: 10 },
    { id: "cirugia", nombre: "Cirugía", semestre: 10, req: ["procedimientos", "semiologia"]},
    { id: "med-legal", nombre: "Medicina Legal", semestre: 10, req: ["psiquiatria"]},
    { id: "gestion2", nombre: "Gestión II", semestre: 10, req: ["gestion1"] },

    // 11vo semestre
    { id: "especialidades", nombre: "Especialidades Médico-Quirúrgicas", semestre: 11, req: [
        "anestesia","cirugia","med-legal","mujer","salud-ocupacional","rehab-nino","rehab-adulto"
    ] },
    { id: "investigacion-ap", nombre: "Investigación Aplicada en Salud", semestre: 11 },
    { id: "atencion-primaria", nombre: "Atención Primaria en Salud", semestre: 11 }
];

const ramosAprobados = new Set();

function requisitosPrimerosCincoAprobados() {
    return ramos
        .filter(r => r.semestre >= 1 && r.semestre <= 5)
        .every(r => ramosAprobados.has(r.id));
}

function requisitosAprobados(ramo) {
    // Para materias de 6° en adelante, necesitas todos los de 1° a 5° aprobados
    if (ramo.semestre >= 6 && !requisitosPrimerosCincoAprobados()) return false;
    // Para materias con requisitos específicos
    if (!ramo.req) return true;
    return ramo.req.every(r => ramosAprobados.has(r));
}

function mostrarAdvertencia(ramo) {
    const modal = document.getElementById('modalAdvertencia');
    const titulo = document.getElementById('modalTitulo');
    const mensaje = document.getElementById('modalMensaje');
    titulo.textContent = `No puedes abrir "${ramo.nombre}" aún`;

    if (ramo.semestre >= 6 && !requisitosPrimerosCincoAprobados()) {
        mensaje.innerHTML = `Debes aprobar <b>todas las materias de 1° a 5° semestre</b> antes de continuar.<br>
        <small>Completa los primeros semestres para desbloquear los siguientes.</small>`;
    } else if (ramo.req && ramo.req.includes("neurociencias") && !ramosAprobados.has("neurociencias")) {
        mensaje.innerHTML = `Debes aprobar <b>Neurociencias</b> antes de desbloquear los sistemas.<br>
        <small>Selecciona la materia "Neurociencias" en 2° semestre para continuar.</small>`;
    } else if (ramo.req && ramo.req.includes("gestion1") && !ramosAprobados.has("gestion1")) {
        mensaje.innerHTML = `Debes aprobar <b>Gestión I</b> antes de abrir Gestión II.<br>
        <small>Selecciona la materia "Gestión I" en 9° semestre para continuar.</small>`;
    } else {
        mensaje.innerHTML = `Aún no has cumplido todos los <b>pre-requisitos</b> para esta materia.<br>
        <small>Revisa las materias previas que necesitas aprobar.</small>`;
    }

    modal.style.display = 'block';
}

// Cerrar modal al hacer clic en la X o fuera del cuadro
window.onload = function() {
    renderMalla();
    const modal = document.getElementById('modalAdvertencia');
    const cerrarModal = document.getElementById('cerrarModal');
    cerrarModal.onclick = () => { modal.style.display = 'none'; };
    window.onclick = function(event) {
        if (event.target == modal) modal.style.display = 'none';
    };
};

function renderMalla() {
    const container = document.getElementById('malla');
    container.innerHTML = '';
    for (let semestre = 1; semestre <= 11; semestre++) {
        const semestreRamos = ramos.filter(r => r.semestre === semestre);
        if (semestreRamos.length === 0) continue;
        const bloque = document.createElement('div');
        bloque.className = 'semestre';
        const titulo = document.createElement('h2');
        titulo.textContent = `${semestre}° semestre`;
        bloque.appendChild(titulo);
        const lista = document.createElement('div');
        lista.className = 'ramo-lista';
        for (let ramo of semestreRamos) {
            const btn = document.createElement('div');
            btn.className = 'ramo';
            btn.id = ramo.id;
            btn.textContent = ramosAprobados.has(ramo.id) ? ('✔ ' + ramo.nombre) : ramo.nombre;
            if(requisitosAprobados(ramo)) btn.classList.add('habilitado');
            if(ramosAprobados.has(ramo.id)) btn.classList.add('aprobado');
            btn.addEventListener('click', () => {
                if (!requisitosAprobados(ramo)) {
                    mostrarAdvertencia(ramo);
                } else if (ramosAprobados.has(ramo.id)) {
                    ramosAprobados.delete(ramo.id); // desmarcar
                    renderMalla();
                } else {
                    ramosAprobados.add(ramo.id); // marcar
                    renderMalla();
                }
            });
            lista.appendChild(btn);
        }
        bloque.appendChild(lista);
        container.appendChild(bloque);
    }
}
