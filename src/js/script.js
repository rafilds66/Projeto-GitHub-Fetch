import { getRepositories } from "./services/repositories.js";
import { getUser } from "./services/user.js";
import { user } from "./Objects/user.js"
import { screen } from "./Objects/screen.js"

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    if(validateEmptyImput(userName)) return;
    getUserData(userName);
})

document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value
    const key = e.which || e.keyCode
    const isEnterKeyPressed = key === 13

    if (isEnterKeyPressed) {
        if(validateEmptyImput(userName)) return;
        getUserData(userName);
    }
})

function validateEmptyImput(userName){
    if(userName.length === 0){
        alert('Digite um nome de usuário do GitHub')
        return true
    }
}

async function getUserData(userName) {
        const userResponse = await getUser(userName)
        if(userResponse.message === 'Not Found'){
            screen.renderNotfound()
            return
        }
        const repositoriesResponse = await getRepositories(userName)
        user.setInfo(userResponse)
        user.setRepositories(repositoriesResponse)
        screen.renderUser(user)
}



