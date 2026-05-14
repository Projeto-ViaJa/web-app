# Instruções para o uso do Dockerfile

# Fazendo com que ele use uma imagem do node : a versão escolhida
FROM node:18 

# Definindo um nome para imagem
WORKDIR  /app 

# Faz a copia de tudo para o package e passando para o container
COPY package*.json ./ 

# Executando o comando dentro do container
RUN npm install

# Copia tudo para dentro do container
COPY . .

# "Expondo" a porta 3333 
EXPOSE 3333

# Após o container executar, vai executar esse comando

CMD [ "npm", "start" ]
    