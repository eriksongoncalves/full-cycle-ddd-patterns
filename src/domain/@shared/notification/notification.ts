export type NotificationError = {
  message: string;
  context: string;
};

export type NotificationErrorProps = {
  message: string;
  context: string;
};

export default class Notification {
  private errors: NotificationErrorProps[] = [];

  addError(error: NotificationErrorProps) {
    this.errors.push(error);
  }

  messages(context?: string) {
    return this.errors
      .filter(error => (!!context ? error.context === context : true))
      .map(error => `${error.context}: ${error.message}`)
      .join(', ');
  }

  hasErrors() {
    return this.errors.length > 0;
  }

  getErrors(): NotificationErrorProps[] {
    return this.errors;
  }
}
