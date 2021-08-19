import { SetMetadata } from '@nestjs/common';

export const Without_Global_Guard_Key = 'withoutGlobalGuard';
export const WithoutGlobalGuard = () => SetMetadata(Without_Global_Guard_Key, true);
