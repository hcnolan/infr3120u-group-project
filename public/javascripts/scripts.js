// IIFE --> Immediatley invoked function expression
(function(){
    {
        console.log("App Started");
            // Delete confirmation msg script
            let deleteButtons = document.querySelectorAll('.btn-danger');
            for(button of deleteButtons)
            {
                button.addEventListener('click', (event)=>{
                    if(!confirm("Are you sure?"))
                    {
                        event.preventDefault();
                        window.location.assign('/reservations');
                    }
                });
        }
    }
    window.addEventListener("load", Start);
})();