import { Story } from "@storybook/react"
import {action} from '@storybook/addon-actions'
import CodeEditor from "../resources/code-editor/CodeEditor"

export default {
    title: 'Playground',
    
    };
    
    const Template: Story = () => <CodeEditor onView={action('onView')}/>;
    
    export const Playground = Template.bind({});


