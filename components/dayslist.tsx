import { FC, useEffect, useState } from "react"
import { useTravel } from "../configurations/contexts/travelContext"
import { TravelsGenerated } from "../constants/interfaces/travel"
import type { TravelDay,Place } from "../constants/interfaces/travel"
import { Divider, List, Text } from "react-native-paper"

interface MyProps {
    data : TravelDay[],
}



export const DaysList:FC<MyProps> = (props) :JSX.Element =>{    

    const {travelGenerated} = useTravel()
    return(
        <>
            <List.Section>
                {props.data.map((item:TravelDay)=>(
                    <>
                    
                    <List.Accordion title={"Day "+ item.day} id={item.day} titleStyle={{fontFamily:"Montserrat-Bold"}} >
                        <List.Item title={()=>(<Text variant="titleSmall">Location: <Text variant="bodyMedium">{item.location}</Text></Text>)} contentStyle={{paddingLeft:'10%'}}/>
                        {item.places.map((place:Place, index:number)=>(
                             <List.Accordion title={"Place: "+ (index +1)} titleStyle={{fontFamily:"Montserrat-Bold"}} key={index} style={{paddingLeft:'5%'}}>
                                <List.Item title={()=>(<Text variant="titleSmall">Place: <Text variant="bodyMedium">{place.place}</Text></Text>)} contentStyle={{paddingLeft:'13%'}}/>
                                <List.Item title={()=>(<Text variant="titleSmall">Description: <Text variant="bodyMedium">{place.placeDescription}</Text></Text>) } style={{flexWrap:'wrap'}} contentStyle={{paddingLeft:'13%'}}/>
                                <List.Item title={()=>(<Text variant="titleSmall">Place price: <Text variant="bodyMedium">{place.price}</Text></Text>) } contentStyle={{paddingLeft:'13%'}}/>
                             </List.Accordion>
                        ))}
                         <List.Item title={()=>(<Text variant="titleSmall">Day price: <Text variant="bodyMedium">{item.price}</Text></Text>)} contentStyle={{paddingLeft:'10%'}}/>
                         
                    </List.Accordion>
                    <Divider/>
                    </>
                ))}
            </List.Section>  
        </>
 
    )
}