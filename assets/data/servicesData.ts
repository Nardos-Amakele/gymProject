export type Service = {
    title: string;
    price: string;
    benefits: string[];
    isPremium?: boolean;
    isPerDay?: boolean;
  };
  
  export type Tab = 'Body Building' | 'Exercise' | 'Group Fitness' | 'Personal Training';
  
  export const services: { [key in Tab]: Service[] } = {
    'Body Building': [
      {
        title: 'Monthly',
        price: '1100 Birr',
        benefits: [
          'Unlimited gym access with personalized bodybuilding coaching.',
          'Includes two 1:1 coaching sessions per week.',
          'Free access to one special bodybuilding event each month.',
        ],
        
      },
      {
        title: '3 Months',
        price: '3100 Birr',
        benefits: [
          'Access for three months with regular progress check-ins and assessments.',
          'Includes access to nutritional workshops and meal plans.',
          'Monthly performance tracking and progress reports.'
        ]
      },
      {
        title: '6 Months',
        price: '6000 Birr',
        benefits: [
          'Half-year access to gym facilities, including all bodybuilding equipment.',
          'Free nutritional tracking and monthly assessments.',
          'Discount on fitness and wellness workshops.'
        ]
      },
      {
        title: 'Yearly',
        price: '11500 Birr',
        isPremium: true,
        benefits: [
          'Full year of access to all bodybuilding equipment and classes.',
          'Priority booking for 1:1 coaching and diet consultations.',
          'Exclusive discounts on supplements and apparel.'
        ]
      }

    ],
    'Exercise': [
      {
        title: 'Per day',
        price: '500 Birr',
        benefits: ['Come to our gym, get access to all exercise equipment and classes.'],
        isPerDay: true,
      },
      {
        title: '20 Days (With Coupon)',
        price: '1000 Birr',
        benefits: [
          '20 days of gym and class access with optional fitness tracking.',
          'Eligible for a discount on future memberships.',
          'Access to one free group fitness class.'
        ]
      },
      {
        title: 'Monthly(12 days)',
        price: '1300 Birr',
        benefits: [
          'One-month access to gym and classes with weekly fitness assessments.',
          'Access to member-only fitness workshops and discounts on training packages.'
        ]
      },
      {
        title: 'Monthly',
        price: '1300 Birr',
        benefits: [
          'One-month access to gym and classes with weekly fitness assessments.',
          'Access to member-only fitness workshops and discounts on training packages.'
        ]
      },
      {
        title:  '3 Monthly',
        price: '3600 Birr',
        benefits: [
                'Three months of access to all exercise equipment and classes.',
                'Weekly check-ins with a fitness coach and personalized workout plans.',
                'Free entry to one nutrition seminar.',
        ]
      },

      {
        title:"6 Months",
              price:"7200 Birr",
              benefits:[
                'Unlimited gym access with exclusive discounts on personal training services.',
                'Monthly goal assessments and free entry to selected fitness workshops.',
                'Includes optional nutritional guidance.',
              ]
      },
      {
        isPremium:true,
              title:"Yearly",
              price:"14000 Birr",
              benefits:[
                '12-month access to all exercise classes, equipment, and fitness consultations.',
                'Custom fitness programs and bi-weekly goal assessments.',
                'Access to members-only events and special sessions.',
              ]
      }
    ],
    'Group Fitness': [
      {
        isPremium: true,
        title: 'Group Fitness Only',
        price: '1800 Birr',
        benefits: [
          'Access to all group fitness classes, including yoga, Zumba, and pilates.',
          'Discounts on fitness gear and supplements.',
          'Weekly fitness tracking and optional dietary consultations.',
        ],
      },
      {
        title: 'Group Fitness + Exercise',
        price: '1200 Birr',
        benefits: [
          'Full access to group fitness classes and exercise equipment.',
          'Weekly coaching and nutrition tracking.',
          'Includes two special events per month.',
        ],
      },
    ],
    'Personal Training': [
      {
              title:"1-on-1 Coaching",
              price:"2,000 Birr / session",
              benefits:[
                'Includes post-session progress analysis and fitness tracking.',
                'Custom workout plans and nutrition advice.',
    ]},
            
            {
              isPremium: true,
              title: 'Monthly Personal Training Package',
              price: '7500 Birr / month',
              benefits: [
                'Customized workout and nutrition plan tailored to your goals.',
                'Access to all fitness classes and gym equipment.',
              ]
            }
    ],
    };