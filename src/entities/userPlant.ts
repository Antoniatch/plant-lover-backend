import { Field, ObjectType } from "type-graphql";
import { Category, Environment, Exposure } from "../enums";

import { Observation } from "./Observation";

@ObjectType()
export class UserPlant {
    @Field()
    id: string;

    @Field(() => Category)
    category: Category;

    @Field({ nullable: true })
    plantId?: string;

    @Field()
    userId: string;

    @Field()
    trackingId: string;

    @Field({ nullable: true })
    mixId?: string;

    @Field({ nullable: true })
    image?: string;

    @Field({ nullable: true })
    nickname?: string;

    @Field(() => Date, { nullable: true })
    birthday?: string;

    @Field({ nullable: true })
    watering?: number;

    @Field(() => Exposure, { nullable: true })
    exposure?: Exposure;

    @Field({ nullable: true })
    repotting?: number;

    @Field(() => Environment, { nullable: true })
    environment?: Environment;

    @Field(() => [Observation])
    observations: Observation[];
}
