declare module "react-cropper" {
  import Cropper from "cropperjs";
  import { Component } from "react";

  export interface ReactCropperProps extends Cropper.Options {
    onInitialized?: (instance: Cropper) => void;
    dragMode?: "crop" | "move" | "none";
    src: string;
  }

  class ReactCropper extends Component<ReactCropperProps> {
    cropper: Cropper;
  }

  export default ReactCropper;
}
