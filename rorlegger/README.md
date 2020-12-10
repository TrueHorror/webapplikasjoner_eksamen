# Eksamen Fredrik og Trond

## Installasjon
1. Last ned git repo
2. Naviger til 

## Roller
<b>Vi benytter koder for å tilgangsstyring:</b><br>
0: admin<br>
1: vanlig bruker<br>
2: ansatt<br>
3: partner

## Brukere
<b>Admin:</b><br>
admin@admin.no<br>
pw: drossap123

<b>Bruker:</b><br>
john@johnsen.no<br>
pw: drossap123

## Testing av klient
Klient er testet ved hjelp av rammeverkene Jest og Testing-library.
Gå til ```/client``` og kjør ```npm test```. For coverage kjør ```npm run test:coverage```

## Testing av server



## Sikkerhet
Følgende tiltak er implementert mtp. sikkerhet:
### Inputvalidering
Inputvalidering i klient og server er implementert.
### XSS beskyttelse
Helmet er installert, og dette går gjennom forespørsler.
Prøvde å sende inn 'script' tag, men den ble ikke kjørt på brukersiden i etterkant.
### Sanering av data som skal inn til MongoDB
Express Mongoose Sanitize er installert
### DoS-angrep
Express Rate Limit er installert for å forhindre
at en IP kan sende for mange forespørsler i et kort tidsrom.

## API
APIet er dokumentert her:
https://documenter.getpostman.com/view/9823323/TVmPBHM1#d606b8cc-ace9-4ba2-ac43-e05778e7764a

## Copy/Paste
Her kommer litt informasjon om kode vi har funnet på nettet eller fra tidliger obliger.
1. /Styled.jsx - Linje 4, 93, 444
2. /App.js - Linje 12

### Bilder til/fra database 
Til hjelp da vi skulle hente/sende bilder brukte vi kode fra denne tutorialen: https://medium.com/swlh/uploading-images-to-mongodb-with-multer-ed345f2922ba
```/server/routes/articleImages.route.js```

### Beskyttelse mot CSRF
Benyttet en del eksempelkode som sto på nettsiden til NPM.
https://www.npmjs.com/package/csurf
https://www.npmjs.com/package/cookie-parser
```/server/server.js```
og
```/server/routes/middleware.js```


