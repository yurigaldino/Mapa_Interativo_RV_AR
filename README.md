# Interactive Map RV AR
Os dados que são consumidos por este código, são proveninentes da API 
do RainViwer e do XML de dados do AlertaRio (este atualizado pelo servidor). 
Em paralelo, está sendo desenvolvido um script que faz um "decoder" de dados AIS 
de embarcações (a ideia é que também seja atualizado pelo servidor, utilizando o node.js). 

### What covered here
* Uso de JSON direto do código da API do RainViewer.
* Uso da biblioteca Leaflet.
* Uso de dados atualizados pelo servidor do AlertaRio.
* Desenvolvimento de JS a parte para o decoder de dados AIS... (É preciso de ideias para back-end aqui como o node express)

- Os dados principais estão da pasta DATA
- A pasta JS-AIS-Decoder-Axios- contém código teste de AIS que vem sendo desenvolvido.
- Link do mapa em nosso servidor: http://localhost:33380/Mapa_Interativo_RV_AR/Mapa_Interativo_RV_AR.html

View [rainviewer-api-example.html](https://rainviewer.github.io/rainviewer-api-example/rainviewer-api-example.html) in your browser.