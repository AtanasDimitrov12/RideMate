describe("AuthContainer E2E Tests", () => {
  const newUser = {
    username: "cypresstestuser",
    email: "cypresstest@example.com",
    phoneNumber: "123456789",
    password: "password123",
  };

  beforeEach(() => {
    cy.visit("/register", { timeout: 10000 });
  });

  it("should load the AuthContainer with Sign In panel active by default", () => {
    cy.get('[data-testid="auth-container"]').should("exist");
    cy.get('[data-testid="sign-in-container"]').should("be.visible", { timeout: 5000 });
    cy.get('[data-testid="sign-up-container"]').should("not.be.visible", { timeout: 5000 });
  });

  it("should toggle to Sign Up panel when clicking Sign Up", () => {
    cy.get('[data-testid="sign-up-button"]').click();
    cy.get('[data-testid="auth-container"]').should("have.class", "right-panel-active", { timeout: 10000 });
    cy.get('[data-testid="sign-up-container"]').should("be.visible", { timeout: 10000 });
  });

  it("should register successfully with valid inputs", () => {
    cy.get('[data-testid="sign-up-button"]').click();
    cy.get('[data-testid="username-signup"]').type(newUser.username);
    cy.get('[data-testid="email-signup"]').type(newUser.email);
    cy.get('[data-testid="phone-number-signup"]').type(newUser.phoneNumber);
    cy.get('[data-testid="password-signup"]').type(newUser.password);
    cy.get('[data-testid="confirm-password-signup"]').type(newUser.password);
    cy.get('[data-testid="sign-up-submit"]').click();

    cy.get(".Toastify__toast", { timeout: 5000 }).should("contain", "Signup successful!");
  });

  it("should toggle back to Sign In panel when clicking Sign In", () => {
    cy.get('[data-testid="sign-up-button"]').click();
    cy.get('[data-testid="sign-in-button"]').click();
    cy.get('[data-testid="auth-container"]').should("not.have.class", "right-panel-active", { timeout: 10000 });
    cy.get('[data-testid="sign-in-container"]').should("be.visible", { timeout: 10000 });
    cy.get('[data-testid="sign-up-container"]').should("not.be.visible", { timeout: 10000 });
  });

  it("should log in successfully with valid credentials", () => {
    cy.get('[data-testid="username-input"]').type(newUser.username);
    cy.get('[data-testid="password-input"]').type(newUser.password);
    cy.get('[data-testid="sign-in-submit"]').click();

    cy.get('button').contains("Log out", { timeout: 10000 }).should("be.visible");
  });

  it("should show validation errors when registering with invalid inputs", () => {
    cy.get('[data-testid="sign-up-button"]').click();
    cy.get('[data-testid="username-signup"]').type("t");
    cy.get('[data-testid="email-signup"]').type("invalid-email@gmail.com");
    cy.get('[data-testid="phone-number-signup"]').type("12345");
    cy.get('[data-testid="password-signup"]').type("short");
    cy.get('[data-testid="confirm-password-signup"]').type("different");
    cy.get('[data-testid="sign-up-submit"]').click();

    cy.get(".Toastify__toast", { timeout: 10000 }).should(
      "contain",
      "Username must contain only letters and be at least 3 characters long."
    );
  });

  after(() => {
    // Step 1: Log in to get the token
    cy.request("POST", "http://localhost:8080/auth/login", {
      username: newUser.username,
      password: newUser.password,
    }).then((loginRes) => {
      expect(loginRes.status).to.eq(200);
      const token = loginRes.body.token;
  
      // Step 2: Delete the user using email in the path (your controller uses email)
      cy.request({
        method: "DELETE",
        url: `http://localhost:8080/api/users/email/${newUser.email}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        failOnStatusCode: false,
      }).then((deleteRes) => {
        expect([204]).to.include(deleteRes.status);
      });
    });
  });
  
  
});
