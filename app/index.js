import { Application } from "./lib/view";

import { ViewEnd } from "./views/end";
import { ViewExercise } from "./views/exercise";
import { ViewSelect } from "./views/select";

class MultiScreenApp extends Application {
  screens = { ViewSelect, ViewExercise, ViewEnd };
}

MultiScreenApp.start("ViewSelect");
