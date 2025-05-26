import {ThemedText} from "@/components/ThemedText";
import {User} from "@/models/User";

type UserCardProps = {user:User}

export function UserCard({user}: {user : UserCardProps}){
        return(
            <ThemedText>
            {UserCard.name}
        </ThemedText>
        );
}