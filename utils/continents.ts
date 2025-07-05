
// set continet's id from continent's name
export const setContinentId= (continent:string) :number =>{
    switch(continent){
        case 'America':
            return 1;
        case 'Europe':
            return 2;  
        case 'Asia':
            return 3;    
        case 'Africa':
            return 4;

        case 'Oceania':
            return 5;
        case ' Antarctica':
            return 6;
        default: 
            return 0;
    }
}