// Ships the stylesheet as dist/styles.css for apps that prefer to import it once globally.
import { copyFileSync } from "node:fs";

copyFileSync(new URL("../src/styles.css", import.meta.url), new URL("../dist/styles.css", import.meta.url));
