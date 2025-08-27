import { Field, ID, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'

@ObjectType()
export class Item {
  @ApiProperty({
    example: '01125TAZM85RDKJWKSC9JBRV16',
    description: 'The unique ID of the Item',
  })
  @Field(() => ID, {
    description: 'The unique ID of the Item',
  })
  id: string

  @ApiProperty({
    example:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    description: 'Any text.',
  })
  @Field({
    description: 'Any text.',
  })
  text: string
}
