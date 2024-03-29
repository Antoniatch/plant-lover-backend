import { Field, ObjectType } from "type-graphql";
import { Like } from "./Like";

@ObjectType()
export class Comment {
    @Field()
    id: string;

    @Field()
    text: string;

    @Field(() => Date)
    date: Date;

    @Field(() => [Like])
    likes: Like[];

    @Field()
    authorId: string;

    @Field({ nullable: true })
    observationId?: string;

    @Field({ nullable: true })
    userPlantId?: string;

    @Field({ nullable: true })
    plantId?: string;
}
