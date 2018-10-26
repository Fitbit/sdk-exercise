import { Application } from "./lib/view";

import { ViewSelect } from "./views/select";
import { ViewExercise } from "./views/exercise";
import { ViewEnd } from "./views/end";

class MultiScreenApp extends Application {
  screens = { ViewSelect, ViewExercise, ViewEnd };
}

MultiScreenApp.start("ViewSelect");
