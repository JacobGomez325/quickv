import { Rule, RulesMessages } from "../contracts";
import { spliteParam } from "../utils";
import { QvBag } from "../validation/qv-bag";
/**
 * @author Claude Fassinou
 */
export class QvMessages {
  protected messages = QvBag.allMessages();

  getRulesMessages(rules: Rule[]): string[] {
    const messages: string[] = [];

    for (const rule of rules) {
      if (this.messages[rule]) {
        messages.push(this.messages[rule]);
      } else {
        messages.push("Invalid input");
      }
    }

    return messages;
  }

  parseMessage(
    inputName: string,
    rule: Rule,
    message: string,
    replace?: string
  ): string {
    let replacements = [inputName, ...spliteParam(replace ?? "")];

    let parsedMessage = message;
    //Remove input if :field not present
    if (!parsedMessage.includes(":field")) {
      replacements = replacements.slice(1);
    }
    parsedMessage = this.replace(message, parsedMessage, replacements);

    return parsedMessage;
  }
  /**
   *
   * @param messages
   * @returns
   */
  setMessages(messages: RulesMessages) {
    this.messages = messages;
    return this;
  }

  private replace(message: string, parsedMessage: any, replacements: any) {
    // Recherche toutes les sous-chaînes commençant par ':'
    const matches = message.match(/:[a-zA-Z]+/g);

    // Si des sous-chaînes ont été trouvées
    if (matches) {
      // Pour chaque sous-chaîne, on la remplace par la valeur correspondante dans replacements
      for (let i = 0; i < matches.length; i++) {
        const replacement = replacements[i] ?? "";
        // Remplacement de la sous-chaîne dans le message original
        parsedMessage = parsedMessage.replace(matches[i], replacement);
      }
    }

    return parsedMessage;
  }
}
