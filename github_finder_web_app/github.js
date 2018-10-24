class Github{
    constructor(){
        this.client_id = 'b08ec5bceed083e2ba68';
        this.client_secret = 'aa02eb1e00864e3e1c4edb595d37074832e65520';
    }

    async getUser(user){
        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id 
        = ${this.client_id} & client_secret=${this.client_secret}`);

        const profile = await profileResponse.json();

        return {
            profile
        }
    }
}