const querExecuter = require('./config/db');
const fetch = require("node-fetch");
require('dotenv').config();
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta:{service: 'user-service'},
    transports:[
        new winston.transports.File({filename: 'info.log', level: 'info'}),
    ]
})


const fetchUsers = async () =>{
    const sqlQuery = 'select username, email from user';
    const result = await querExecuter(sqlQuery,[]);
    return result;
}

const fetchRepositories = async () =>{
    const users = await fetchUsers();
    let repositories = []
    for(let index = 0; index < users.length; index ++){
        const url = `https://api.github.com/users/${users[index].username}/repos`;
        const result = await fetch(url,{
            headers:{
                'authorization': 'token '+process.env.GIT_TOKEN
            },
        }
        );
        if(result.status !== 200){
            console.log(result.status)
        }
        const userRepositories = (await result.json())
        const filteredRepositories = await mapRepositories(userRepositories, users[index].email)

       repositories.push(filteredRepositories);
    }
    return repositories;
}

const mapRepositories = async (repositories, userEmail) =>{
    const userRepositories = []
    for(let index = 0; index < repositories.length; index++){
        const repoDetails = {
            repositoryOwner: repositories[index].owner.login,
                  email: userEmail,
                    repositoryId: repositories[index].id,
                    repositoryName: repositories[index].name,
                    repositoryUrl: repositories[index].html_url,
                    contributors: await getContributors(repositories[index].contributors_url)
        }
        userRepositories.push(repoDetails);
    }
    return userRepositories;
}

const getContributors = async (url) =>{
    const result = await fetch(url,{
        headers:{
            'authorization': 'token '+process.env.GIT_TOKEN
        },
    });
    const contributors = await result.json()
    return contributors.length;
}

const pushRepositories = async () =>{
    logger.log({
        level: 'info',
        message: 'Cron Started',
    })
    const repositories = await fetchRepositories();
    const sqlQuery = 'truncate repo';
    const result = await querExecuter(sqlQuery,[]);
    const query = 'insert into repo (id, username, repository_name, repository_url, email, contributors) values (?,?,?,?,?,?)';
    for(let index = 0; index < repositories.length; index++){
        repositories[index].map(async data =>{
            const values = [data.repositoryId, data.repositoryOwner, data.repositoryName, data.repositoryUrl, data.email, data.contributors];
            const result = await querExecuter(query, values);
        })
    }
    logger.log({
        level: 'info',
        message: 'Data pulled and updated into database'
    })

}



module.exports = pushRepositories;