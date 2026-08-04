import { Link } from "react-router-dom";

import Center from "@/components/layout/Center";
import Container from "@/components/layout/Container";
import Page from "@/components/layout/Page";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function StatusPage({
  icon: Icon,
  title,
  description,
  secondaryDescription,
  primaryAction,
  secondaryAction,
}) {
  return (
    <Page>
      <Container>
        <Center className="min-h-[calc(100vh-4rem)]">
          <Card className="w-full max-w-md text-center">
            <CardHeader className="items-center space-y-4">
              {Icon && (
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                  <Icon className="h-7 w-7 text-muted-foreground" />
                </div>
              )}

              <CardTitle className="text-2xl">
                {title}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {description}
              </p>

              {secondaryDescription && (
                <p className="text-sm text-muted-foreground">
                  {secondaryDescription}
                </p>
              )}
            </CardContent>

            {(primaryAction || secondaryAction) && (
              <CardFooter className="flex justify-center gap-3">
                {secondaryAction && (
                  <Button
                    asChild
                    variant={secondaryAction.variant ?? "outline"}
                  >
                    <Link to={secondaryAction.to}>
                      {secondaryAction.label}
                    </Link>
                  </Button>
                )}

                {primaryAction && (
                  <Button
                    asChild
                    variant={primaryAction.variant ?? "default"}
                  >
                    <Link to={primaryAction.to}>
                      {primaryAction.label}
                    </Link>
                  </Button>
                )}
              </CardFooter>
            )}
          </Card>
        </Center>
      </Container>
    </Page>
  );
}