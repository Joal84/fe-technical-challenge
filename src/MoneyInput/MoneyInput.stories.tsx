import { Meta } from '@storybook/react'
import MoneyInput from './MoneyInput'

interface InputArgs {
  label: string
  locale: string
  disabled: boolean
}
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/MoneyInput',
  component: MoneyInput,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} satisfies Meta<typeof MoneyInput>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
const inputArgs = (args: InputArgs) => <MoneyInput {...args} />

type StoryWithArgs = ((args: InputArgs) => JSX.Element) & { args?: InputArgs }

export const Default: StoryWithArgs = inputArgs.bind({})

Default.args = {
  label: 'Amount',
  locale: 'en',
  disabled: false,
}
