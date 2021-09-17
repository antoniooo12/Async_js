import './scss/index.scss'

import {Application} from "./scripts/Classes/Application";
import {Input} from "./scripts/Classes/Input/Input";
import {Pull} from "./scripts/Classes/Pull/Pull";
import {Dashboard} from "./scripts/Classes/Dashboard/Dashboard";
import {Line} from "./scripts/Classes/Line/Line";

const app =new Application("#start",{
    components:[Line, Dashboard,Input],
    mediator:[Pull],
})
app.render();