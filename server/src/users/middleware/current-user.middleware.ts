import { Response, NextFunction } from 'express';

export function currentUser(req, res: Response, next: NextFunction) {
  if (req.session.passport) {
    req.currentUser = req.session.passport;
  }
  next();
}
