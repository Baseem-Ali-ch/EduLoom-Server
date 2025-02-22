import jwt from 'jsonwebtoken';
import { BaseRepository } from '../../repo/base.repo';
import { IUser } from 'src/interfaces/IUser';

export class SharedService {
  private _baseRepository: BaseRepository<IUser>;

  constructor(baseRepository: BaseRepository<IUser>) {
    this._baseRepository = baseRepository;
  }

  async refreshAccessToken(refreshToken: string): Promise<string> {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || '') as { id: string; email: string };

    const user = await this._baseRepository.findById(decoded.id);
    if (!user) {
      throw new Error('User not found');
    }

    const newAccessToken = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || '', { expiresIn: '1h' });

    return newAccessToken;
  }
}
