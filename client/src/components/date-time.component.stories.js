import DateTime from './date-time.component';

const dates = [
  '2021-04-27T10:00:00',
  '2021-04-27T11:00:00',
  '2021-04-27T12:00:00',
  '2021-04-27T13:00:00',
  '2021-04-28T14:00:00',
  '2021-04-28T15:00:00',
  '2021-04-28T16:00:00',
];

const Screen = {
  title: 'Components/DateTime',
  args: { dates: [] },
  argTypes: { setServiceCategory: { action: 'setServiceCategory' } },
};

export default Screen;

const Template = args => <DateTime {...args} />;

export const Default = Template.bind({});

// export const Restricted = Template.bind({});
// Restricted.args = { dates };
