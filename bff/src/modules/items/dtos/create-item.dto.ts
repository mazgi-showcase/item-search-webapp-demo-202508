import { ApiProperty } from '@nestjs/swagger'

export class CreateItemDto {
  @ApiProperty({
    example:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    description: 'A text.',
  })
  readonly text: string
}
