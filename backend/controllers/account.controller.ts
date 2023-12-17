import { Request, Response, NextFunction, CookieOptions } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models';
// import Account from '../models/account.model';

// interface AccountInterface {
//   username: string;
//   email: string;
//   password: string;
// } 
 
// // export default ;

class AccountController {
  // Sign up for an account 
  async signUp(request: Request, response: Response, next: NextFunction) {
    const account = request.body;
    try {
      // Require username in the request body
      if (!account?.username) {
        return response.status(400).send('Missing username');
      }

      // Require email in the request body
      if (!account?.email) {
        return response.status(400).send('Missing email');
      }

      // Require password in the request body
      if (!account?.password) {
        return response.status(400).send('Missing password');
      }

      // Check if the email is already in use
      try {
        const existingAccount = await db.Account.findByEmail(account.email);
        if (existingAccount) {
          return response.status(400).send('Account could not be created');
        }
      }
      catch (error) {
        return response.status(400).send('Account could not be created');
      }
      
      // Create the account with the data in the request
      await db.Account.create(
        { 
          username: account.username, 
          email: account.email,
          password: await bcrypt.hash(account.password,10), // Hash the password
        });
      
      return response.status(201).send('Account created successfully');
    }
    catch (error) {
      // next(error);
    };
  }

  // Sign in to the account
  async signIn(request: Request, response: Response) {
    // Respond with an error if body is missing required fields
    // Require email in the request body
    const account = request.body;
    if (!account?.email) {
      return response.status(400).send('Missing email'); 
    }

    // Require password in the request body
    if (!account?.password) {
      return response.status(400).send('Missing password');
    }

    // Get the relevant account from the database and compare that password to the password in the request body
    const record = await db.Account.findByEmail(account.email);

    if (!record) {
      return response.status(404).send('Account could not be logged in');
    }
    // Usue bcrypt to compare plain text to the hashed password
    try {
      const isValidPassword = await bcrypt.compare(account.password, record.password);

      // Invalid passwords respond with an error 
      if (!isValidPassword) {
        throw new Error('Invalid password');
      }
    }
    catch (error) {
      return response.status(403).send('Account could not be logged in');
    }

    // Password is verified. Create a JWT with the account data
    const token = jwt.sign(record, process.env.JWT_SECRET!, {expiresIn: 3600 * 24});
    // Store the JWT in a cookie

    const cookieOptions : CookieOptions = {
      expires: new Date(Date.now() + 3600 * 24 * 1000), // ms not s 
      secure: process.env.ENVIRONMENT === "Local" ? false : true, 
      httpOnly: true, 
      sameSite: "none"
    }

    // respond with success and add the cookie
    const recordResponse = {
      username: record.username,
      email: record.email,
      isLoggedIn: true,
    }
    return response.status(200).cookie('jwt-auth', token, cookieOptions).json(recordResponse);
  }

  async searchForAccounts(request: Request, response: Response) {
    const userId = request.body.user.id;
    const searchString = request.query.searchString;
    if (!searchString) {
      return response.status(400).send('Missing search string');
    }

    const accounts = await db.Account.searchForAccounts(searchString, userId);
    return response.status(200).json(accounts);
  }

  async testPublicRequest(request: Request, response: Response) {
    if (request.cookies['jwt-auth']) {
      return response.status(400).send('Public request successful with cookie');
    }
    return response.status(200).send('Public request successful without cookie');
  }

  async testPrivateRequest(request: Request, response: Response) {
    return response.status(200).send('Private request successful with cookie');
  }
}

export default AccountController;