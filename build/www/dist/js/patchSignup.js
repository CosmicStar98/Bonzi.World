let inMemoryToken;


const signInForm = document.querySelector( "#login-modal-login-inner modal-panel-inner ng-scope" );
signInForm.addEventListener( "submit", ( e ) => {
    const email = document.querySelector( "#email" ).value;
    const username = document.querySelector( "#username" ).value;
    const password = document.querySelector( "#password" ).value;
    e.preventDefault();
    console.log( email, username, password );
    fetch( "/api/v2/login", {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( {

            "email": email,
            "username": username,
            "password": password,

        } )
    } ).then( res => res.json() )
        .then( res => {
            console.log( res );
            let inMemoryToken = res.token;
            console.log( inMemoryToken );
            // { Authorization: `Bearer  ${ inMemoryToken }`; }
            return inMemoryToken;
            localStorage.setItem('user', JSON.stringify(res));
        } );

    console.log( inMemoryToken );

    
 return inMemoryToken;
} );
// inMemoryToken = res.body.token[ 0 ];
// let inMemoryToken2 = inMemoryToken;

console.log( inMemoryToken );