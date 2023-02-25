/* import { Down_the_Rabbit_Hole_png } from "../testFiles/Down_the_Rabbit_Hole_png"; */
import { PNG2SVGOptions } from "svg-png-converter";
import { RemoveProperties } from 'misc-utils-of-mine-generic'

export interface Example {
  name: string
  description: string;
  outputName: string
  inputSize?: number
  outputSize?: number
  //svg2png?: { input: string } & RemoveProperties<SVG2PNGOptions, 'input'>
  png2svg?: { input: string } & RemoveProperties<PNG2SVGOptions, 'input'>
}

/* export const ExampleIMG: Example = {
  name: 'Down_the_Rabbit_Hole.png',
  outputName: 'Down_the_Rabbit_Hole.svg',
  png2svg: { input: Down_the_Rabbit_Hole_png.trim() },
  description: ' ',
} */