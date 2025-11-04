import { useState } from "react";
import './App.css';
import type { CepData } from "./interfaces/CepData";

export default function App() {
  const [cep, setCep] = useState("");
  const [data, setData] = useState<CepData | null>(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    setData(null);

    const cepOnlyNumeric = cep.replace(/\D/g, "");
    if (cepOnlyNumeric.length !== 8) {
      setError("CEP deve conter 8 dígitos numéricos.");
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepOnlyNumeric}/json/`);
      const result: CepData = await response.json();

      if (result.erro) {
        setError("CEP não encontrado.");
      } else {
        setData(result);
      }
    } catch {
      setError("Erro ao consultar o CEP.");
    } 
  };

  return (
    <div className="app-container">
      <div className="cep-box">
        <h1>Consulta de CEP</h1>

        <div className="input-group">
          <label htmlFor="cep">CEP</label>
          <input
            id="cep" 
            type="text"
            placeholder="Digite o CEP (ex: 01001000)"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>

        <button id="buscarCepBtn" onClick={handleSearch}>
          Buscar CEP
        </button>

        {error && <p className="error-text">{error}</p>}

        {data && (
          <div className="result-box">
            <div className="input-group">
              <label>Logradouro</label>
              <input type="text" value={data.logradouro || ""} readOnly />
            </div>

            <div className="input-group">
              <label>Bairro</label>
              <input type="text" value={data.bairro || ""} readOnly />
            </div>

            <div className="input-group">
              <label>Cidade</label>
              <input type="text" value={data.localidade || ""} readOnly />
            </div>

            <div className="input-group">
              <label>UF</label>
              <input type="text" value={data.uf || ""} readOnly />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
