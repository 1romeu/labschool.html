const url = "http://localhost:3000/labschool"

function getAlunos(){
    axios.get(`${url}/aluno`).then ((response) => {
            const data = response.data.result
            
            let html = ""
            
            for(let i = 0; i < data.length; i++){
                html += `<tr>
                    <th scope="row"> ${data[i].id} </th>
                    <td>${data[i].nome}</td>
                    <td>${data[i].telefone}</td>
                    <td>${data[i].dt_nascimento}</td>
                    <td>${data[i].endereco}</td>
                    <td><button class="btn btn-success" type="button" onclick="redirect(${data[i].id}, '${data[i].nome}', '${data[i].telefone}', '${data[i].dt_nascimento}', '${data[i].endereco}')">Editar</button></td>
                    <td><button class="btn btn-danger" type="button" onclick="deleteAluno(${data[i].id})">Excluir</button></td>
                </tr>`
            }

            document.getElementById("table-body").innerHTML = html
        })
        .catch((error) => console.log(error))
}

function getTurmas(){
    axios.get(`${url}/turma`).then((response) => {
        const data = response.data.result

        let html = "<option disabled selected>Selecione uma opcao</option>"

        for(let i=0;i<data.length;i++){
            html += `<option value="${data[i].id}">${data[i].nome}</option>`
        }
        document.getElementById("curso-select").innerHTML = html
    }).catch((error)=> console.log(error))
}

function getTurmasBySelected(){
    let select = document.getElementById("curso-select")
    let option = select.options[select.selectedIndex].value

    axios.get(`${url}/aluno/${option}`).then((response)=> {
        const data = response.data.result

        let html = ""

        for(let i = 0; i < data.length; i++){
            html += `<tr>
                <th scope="row"> ${data[i].id} </th>
                <td>${data[i].nome}</td>
                <td>${data[i].telefone}</td>
                <td>${data[i].dt_nascimento}</td>
                <td>${data[i].endereco}</td>
                <td><button class="btn btn-success" type="button" onclick="redirect(${data[i].id}, '${data[i].nome}', '${data[i].telefone}', '${data[i].dt_nascimento}', '${data[i].endereco}')">Editar</button></td>
                <td><button class="btn btn-danger" type="button" onclick="deleteAluno(${data[i].id})">Excluir</button></td>
            </tr>`
        }
        document.getElementById("table-body").innerHTML = html

    }).catch((error) => console.log(error))
}

function createAluno(){ //Criado a funcao para criar aluno 
    let nome = document.getElementById("inputName").value 
    let telefone = document.getElementById("inputCell").value
    let dt_nascimento = document.getElementById("inputDate").value
    let endereco = document.getElementById("inputAddress").value

    let select = document.getElementById("curso-select")
    let option = select.options[select.selectedIndex]

    const data = {
        nome: nome,
        telefone: telefone,
        data: dt_nascimento,
        endereco: endereco,
        turma: option
    }


    axios.post(`${url}/aluno`, data).then((response) => {alert(`Aluno ${response.data.result.nome} Cadastrado com Sucesso!`)
        window.location.href = "http://127.0.0.1:5500/user/formsCreate.html"
    }).catch((error) => console.log(error))
}

function deleteAluno(codigo){
    axios.delete(`${url}/aluno/${codigo}`).then(
        alert("Aluno excluido com sucesso"),
        getAlunos()
    ).catch((error) => console.log(error))
}

function redirect(codigo, nome, telefone, data, endereco){
    window.location.href = `http://127.0.0.1:5500/user/formsUpdate.html?codigo=${codigo}&nome=${nome}&telefone=${telefone}&data=${data}&endereco=${endereco}`
}

function loadFields(){
    const urlParams = new URLSearchParams(window.location.search)

    let id = urlParams.get("codigo")
    let nome = urlParams.get("nome")
    let telefone = urlParams.get("telefone")
    let data = converterData(urlParams.get("data"))
    let endereco = urlParams.get("endereco")

    document.getElementById("inputId").value = id
    document.getElementById("inputName").value = nome
    document.getElementById("inputCell").value = telefone
    document.getElementById("inputDate").value = data
    document.getElementById("inputAddress").value = endereco
}

function converterData(data){
    //Split: remover da String o caracatere '/' e retorna um array com os demais caracteres
    return data.split('/').reverse().join('-')
}

function updateAluno(){
    let id = document.getElementById("inputId").value 
    let nome =  document.getElementById("inputName").value
    let telefone = document.getElementById("inputCell").value 
    let dt_nascimento = document.getElementById("inputDate").value 
    let endereco = document.getElementById("inputAddress").value 
    

    const data = {
        nome: nome,
        telefone: telefone,
        data: dt_nascimento,
        endereco: endereco,
    }

    axios.put(`${url}/aluno/${id}`, data).then(
        alert ("Dados atualizados com sucesso!"),
        window.location.href = "http://127.0.0.1:5500/"
    ).catch(error => console.log(error))
}
