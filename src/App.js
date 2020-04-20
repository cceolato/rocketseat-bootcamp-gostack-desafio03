import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  },[]);

  async function handleAddRepository() {
    const repository = `Novo Repositório ${Date.now()}`;
    const response = await api.post('repositories', {
      title: repository,
      url: 'https://github.com/cceolato/rocketseat-bootcamp-gostack-desafio03',
      techs: ['NodeJS', 'ReactJS']
    });
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    
    const filteredRepos = repositories.filter(
      repository => repository.id !== id
    )

    setRepositories(filteredRepos);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>
              {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <form>
        <button onClick={handleAddRepository}>Adicionar</button>
      </form>
    </div>
  );
}

export default App;
