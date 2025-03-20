import { fakeProducts, Product } from '@/constants/mock-api';
import { notFound } from 'next/navigation';
import RercruiterEditForm from '@/features/recruiters/components/recruiter-forms/recruiter-edit-form';
import RercruiterAddForm from '@/features/recruiters/components/recruiter-forms/recruiter-add-form';

type TRecruiterViewPageProps = {
  recruiterId: string;
};

export default async function RecruiterViewPage({
  recruiterId
}: TRecruiterViewPageProps) {
  let recruiter = null;
  let pageTitle = 'Thêm mới nhà tuyển dụng';

  if (recruiterId !== 'add') {
    // const data = await fakeProducts.getProductById(Number(recruiterId));
    // recruiter = data.product as any;
    recruiter = {} as any;
    if (!recruiter) {
      notFound();
    }
    pageTitle = `Sửa nhà tuyển dụng`;
  }

  return recruiter != null ? (
    <RercruiterEditForm initialData={recruiter} pageTitle={pageTitle} />
  ) : (
    <RercruiterAddForm pageTitle={pageTitle} />
  );
}
