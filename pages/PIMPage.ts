import BasePage from "./BasePage";
import { expect } from "@playwright/test";

export default class PIMPage extends BasePage {
  private employeeListForm = this.page.locator(".oxd-table-filter");

  async addEmployee(firstName: string, lastName: string) {
    await this.page.getByRole("button", { name: "Add" }).click();

    await expect(this.page.getByPlaceholder("First Name")).toBeVisible({
      timeout: 15000,
    });

    await this.page.getByPlaceholder("First Name").fill(firstName);
    await this.page.getByPlaceholder("Last Name").fill(lastName);

    await this.page.getByRole("button", { name: "Save" }).click();
  }

  async goToEmployeeList() {
    await this.page.waitForURL("**/pim/viewEmployeeList", {
      timeout: 15000,
    });

    await this.employeeListForm.waitFor({
      state: "visible",
      timeout: 15000,
    });
  }

  async searchEmployee(firstName: string) {
    await this.goToEmployeeList();

    const employeeNameInput = this.employeeListForm
      .getByPlaceholder("Type for hints...")
      .first();

    await employeeNameInput.fill(firstName);
    await this.page.getByRole("button", { name: "Search" }).click();
  }

  async verifyEmployeeExists(firstName: string) {
    await expect(this.page.getByRole("cell", { name: firstName })).toBeVisible({
      timeout: 15000,
    });
  }
}
