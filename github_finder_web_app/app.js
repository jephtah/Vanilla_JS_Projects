const github = new Github;

//init user

const ui = new UI;

//Search input
const searchUser = document.getElementById('searchUser');

//Search input event listener
//Add event listener for the tap button

searchUser.addEventListener('keyup',(e) =>{
    //Get input text
    const userText = e.target.value;

    if (userText !== ''){
        //Make http call
        github.getUser(userText)
        .then(data =>{
            if(data.profile.message === 'Not found'){
                //Show alert
                ui.showAlert('User not found', 'alert alert-danger');
            }else {
                //Show profile
                ui.showProfile(data.profile);
            }

        })
    }
    else {
        //clear profile
        ui.clearProfile();

    }
});


