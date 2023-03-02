window.addEventListener('load', () => {
    todos = JSON.parse(localStorage.getItem('todos')) || []
    const form = document.querySelector("#new-task-form")
    const input = document.querySelector("#new-task-input")
    const list_el = document.querySelector("#tasks")
    
    
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const task = input.value
        
        const todo = {
            content: task,
            done: false,
            createdAt: new Date().getTime()
        }

        todos.push(todo)
        
        localStorage.setItem('todos',JSON.stringify(todos))



        //l'alerte intervien si le champs n'est pas remplie
        if (!task) {
            alert("Tu n'a rien remplis\nTrouve toi quelque chose à faire")
           return
        }        
        // cette partie du javascript me permet de "recrée le html qui es en commentaire"
        //je crée une div et lui donne la class task
        const task_el = document.createElement("div")
        task_el.classList.add("task")

        //je créé la div avec comme class content
        const task_content_el = document.createElement("div")
        task_content_el.classList.add("content")

        //task_el es la div task et je lui ajoute la div content a linterieur 
        task_el.appendChild(task_content_el)

        // ici on cree l'inout avec le type la valeur et le nom de la classe plus les readonly
        const task_input_el = document.createElement("input")
        task_input_el.classList.add("text")
        task_input_el.type = "text"
        task_input_el.value = task
        task_input_el.setAttribute("readonly", "readonly")

        // dans la div content je lui ajoute linput et ses valeur a l'interieur 
        task_content_el.appendChild(task_input_el)

        //creation de la div avec comme nm de class actions
        const task_actions_el = document.createElement("div")
        task_actions_el.classList.add("actions")


        //le button edit avec nom de class et le contenue du boutton
        const task_edit_el = document.createElement("button")
        task_edit_el.classList.add("edit")
        task_edit_el.innerHTML = "Edit"


        //le button delete avec nom de class et le contenue du boutton
        const task_delete_el = document.createElement("button")
        task_delete_el.classList.add("delete")
        task_delete_el.innerHTML = "Delete"


        //jattribus a actions les 2 bouttons
        task_actions_el.appendChild(task_edit_el)
        task_actions_el.appendChild(task_delete_el)


        //la classe task prend en compte les 2 bouttons
        task_el.appendChild(task_actions_el)

        // on rajoute le tout a list qui contiendra tout les elements qui seront crée par la suite dans la meme div qui es tasks
        // en gros lorsque lon cliquera sur add tasks sa va crée tasks qui créera liput les boutton etc
        list_el.appendChild(task_el)

        input.value = ''
        //un fois les élement crée il faut les faire fonctionner
        //au click je supprime readonly le focus seffectue et tout ce que jentre par la suite se transforme en save
        //puis repasse en edit une fois sortie du save donc de la condition
        task_edit_el.addEventListener("click", () => {
            if (task_edit_el.innerText.toLowerCase() == "edit") {
                task_edit_el.innerText = "Save"
                task_input_el.removeAttribute("readonly")
                task_input_el.focus()

            } else {
                task_edit_el.innerText = "Edit"
                task_input_el.setAttribute("readonly", "readonly")
           }
           
        })
        //pour supprimer rien de plus simple on supprime list qui es egale a supprime la div tasks qui es crée a chaque fois que lon ajoute quelque chose
        // sa supprime la div entiere et sa disparait
        task_delete_el.addEventListener('click', () => {
            list_el.removeChild(task_el)
            console.log("supprimez")
        })
    })
})

