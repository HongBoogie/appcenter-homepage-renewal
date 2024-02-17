import { Suspense } from 'react';
import TeamMemberList from '@components/team/TeamMemberList.tsx';
import Title from '@components/common/Title.tsx';
import TeamSubTitle from '@components/team/TeamSubTitle.tsx';
import TeamEmoji from '@components/team/TeamEmoji.tsx';

const TeamPage = () => {
  return (
    <div className='p-8'>
      <div className='mb-8'>
        <Title title='OUR TEAM' />
      </div>
      <div className='mb-4'>
        <TeamSubTitle />
      </div>
      <div className='mb-4'>
        <TeamEmoji />
      </div>
      <Suspense>
        <TeamMemberList />
      </Suspense>
    </div>
  );
};

export default TeamPage;
