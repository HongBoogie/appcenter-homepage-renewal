import { getApiData } from '@api/api/axios.ts';
import API from '@api/constants/api.ts';
import { GroupsPublicAllResponse } from '@api/dto/groups.ts';
import { Team } from '@type/common.ts';

export const getGroupsPublicAll = (year?: number, part?: Team) => {
  return getApiData<GroupsPublicAllResponse>({
    method: 'GET',
    url: API.GROUPS_PUBLIC_ALL({ part: part, year: year }),
  });
};
