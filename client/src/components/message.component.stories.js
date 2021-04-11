import Message from './message.component';

const Screen = {
  title: 'Components/Message',
};

export default Screen;

export const Messages = () => (
  <>
    <Message variant="danger">Error message</Message>
    <Message variant="warning">Warning message</Message>
    <Message variant="success">Success message</Message>
    <Message variant="primary">Primary message</Message>
    <Message variant="secondary">Secondary message</Message>
    <Message variant="info">Info message</Message>
  </>
);
