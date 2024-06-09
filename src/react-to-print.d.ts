declare module 'react-to-print' {
    import * as React from 'react';
  
    export interface ReactToPrintProps {
      trigger: () => React.ReactElement;
      content: () => React.ReactInstance | null;
      onBeforePrint?: () => void | Promise<void>;
      onAfterPrint?: () => void;
      bodyClass?: string;
      pageStyle?: string;
      documentTitle?: string;
      removeAfterPrint?: boolean;
    }
  
    export function useReactToPrint(props: ReactToPrintProps): () => void;
  }