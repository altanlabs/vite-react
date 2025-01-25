import * as React from 'react';
import { memo } from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { AlertCircle, RefreshCw, Copy, Check } from 'lucide-react';
import { Card, Text, Button, Flex, Heading } from '@radix-ui/themes';


const RootBoundary = () => {
  const error = useRouteError();
  const [copied, setCopied] = React.useState(false);
  
  let errorMessage = "An unexpected error occurred";
  
  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText || error.data?.message;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  const copyError = async () => {
    const errorText = error instanceof Error 
      ? `Error: ${error.message}\n\nStack Trace:\n${error.stack}`
      : errorMessage;
    
    await navigator.clipboard.writeText(errorText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Flex className="fixed inset-0" align="center" justify="center" p="4">
      <Card size="4" style={{ maxWidth: '32rem' }}>
        <Flex direction="column" gap="4" align="center">
          <Flex gap="2" align="center">
            <AlertCircle />
            <Heading size="5">Error Detected</Heading>
          </Flex>
          
          <Text color="gray" size="3">
            Try to copy and send it to the AI to fix it. 
          </Text>

          <Text color="gray" size="2">
            {errorMessage}
          </Text>

          {error instanceof Error && (
            <Card variant="surface" style={{ width: '100%', position: 'relative' }}>
              <Button
                variant="ghost"
                onClick={copyError}
                style={{ 
                  position: 'absolute',
                  right: 8,
                  top: 8
                }}
              >
                {copied ? (
                  <Check width="16" height="16" />
                ) : (
                  <Copy width="16" height="16" />
                )}
              </Button>
              <Text size="1" color="gray" style={{ 
                maxHeight: '50vh',
                overflow: 'auto',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}>
                {error.stack}
              </Text>
            </Card>
          )}

          <Button 
            variant="surface" 
            onClick={() => window.location.reload()}
          >
            <RefreshCw width="16" height="16" />
            Reload
          </Button>
        </Flex>
      </Card>
    </Flex>
  );
};

export default memo(RootBoundary);
