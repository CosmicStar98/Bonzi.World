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
    } ).then( res => res.json() )
        .then( res => {
            console.log( res );
            let inMemoryToken = res.token;
            console.log( inMemoryToken );
            JSON.parse(localStorage.getItem('user'))
            return inMemoryToken;
        } );

    console.log( inMemoryToken );

    
 return inMemoryToken;
} );

console.log( inMemoryToken );