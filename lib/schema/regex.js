const emailRegex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nomeRegex = /^[a-zA-ZÀ-ÿ]{2,}(?:\s+[a-zA-ZÀ-ÿ]{2,})+$/;
const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const telefoneRegex = /^\d{10,11}$/;
const cpfRegex = /^\d{11}$/;
const cnpjRegex = /^\d{11}$/;
const cepRegex = /^\d{8}$/;
const enderecoRegex = /^[a-zA-ZÀ-ÿ0-9\s]{3,}$/;
const cidadeRegex = /^[a-zA-ZÀ-ÿ\s]{3,}$/;
const estadoRegex = /^[a-zA-Z]{2}$/;


export { emailRegex, nomeRegex, senhaRegex, telefoneRegex, cpfRegex, cnpjRegex, cepRegex, enderecoRegex, cidadeRegex, estadoRegex };